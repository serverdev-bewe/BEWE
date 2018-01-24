'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const transactionWrapper = require('./TransactionWrapper');
const pool = mysql.createPool(DBConfig);

// 전체 대화방 리스트
exports.listConversation = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM conversations WHERE users_idx_1 = ? OR users_idx_2 = ?';

    pool.query(sql, [userData, userData], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });
};

// 대화방 내 채팅 리스트
exports.getConversation = (userData, conversationId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM conversations WHERE idx = ?';
    
    pool.query(sql, [conversationId], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        if (rows.length === 1 &&
           (rows[0].users_idx_1 === userData ||
            rows[0].users_idx_2 === userData)) {
          resolve(conversationId);
        } else {
          reject(2412);
        }
      }
    });
  })
  .then((conversationId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM messages WHERE conversation_idx = ?';
      
      pool.query(sql, [conversationId], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          resolve(rows);
        }
      });
    });
  });
};

// 대화방이 존재하는지 확인하고 없으면 새로 생성한다
exports.openConversation = (userData, receiverData) => {
  return new Promise((resolve, reject) => {
    if (userData === receiverData) {
      reject(2411);
    }

    transactionWrapper.getConnection(pool)
    .then(transactionWrapper.beginTransaction)
    .then((context) => {
      return new Promise((resolve, reject) => {
        const sql = 
          `
          SELECT idx 
            FROM conversations 
           WHERE (users_idx_1 = ? AND users_idx_2 = ?) OR (users_idx_1 = ? AND users_idx_2 = ?)
          `;
        context.conn.query(sql, [userData, receiverData, receiverData, userData], (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            context.result = rows;
            resolve(context);
          }
        });
      });
    })
    .then((context) => {
      return new Promise((resolve, reject) => {
        console.dir(context.result);
        if (context.result !== ''){ // 이미 대화방이 있을 경우 생성하지 않는다.
          context.result.insertId = JSON.parse(JSON.stringify(context.result))[0].idx;
          resolve(context);
        } else {
          console.log("새 대화방 생성");
          const last_message = "이제 Messager에서 친구와 쪽지를 주고 받을 수 있습니다!";
          const sql = 
            'INSERT INTO conversations (users_idx_1, users_idx_2, last_message) VALUES (?, ?, ?)';
          context.conn.query(sql, [userData, receiverData, last_message], (err, rows) => {
            if(err){
              console.log(err);
              reject(err);
            }else{
              if (rows.affectedRows === 1) { // 대화방 생성
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("Create Conversation Custom Error 1");
                reject(context);
              }
            }
          });
        }
      });         
    })
    .then(transactionWrapper.commitTransaction)
    .then((context) => {
      context.conn.release();
      resolve(context.result.insertId);
    })
    .catch((context) => {
      context.conn.rollback(() => {
        context.conn.release();
        reject(context.error);
      });
    });
  });
};

// 메시지 전송하기
exports.sendMessage = (messageData) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT users_idx_1, users_idx_2 FROM conversations WHERE idx = ?';
    pool.query(sql, [messageData.conversation_idx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.length === 1) {
          resolve(rows);
        } else {
          reject(2412);
        }
      }
    });
  })
  .then((rows) => {
    return new Promise((resolve, reject) => {
      let sql = '';
      let receiver_idx = 0;

      if (rows[0].users_idx_1 === messageData.sender_idx) { // users_idx_2 = receiver_idx
        receiver_idx = rows[0].users_idx_2;
      } else if (rows[0].users_idx_2 === messageData.sender_idx) { // users_idx_1 = receiver_idx
        receiver_idx = rows[0].users_idx_1;
      }
      sql = 
        `
        INSERT INTO messages (contents, sender_idx, receiver_idx, conversation_idx)
                VALUES (?, ?, ?, ?)
        `;
        
      pool.query(sql, [messageData.contents, messageData.sender_idx, receiver_idx, 
        messageData.conversation_idx], (err, rows) => {
        
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) { // 메시지 생성
            resolve(rows);
          } else {
            const _err = new Error("Send Message Custom error");
            reject(_err);
          }
        }
      })
    });
  })
  .then((rows) => {
    // 마지막으로 해당 conversation 업데이트
    return new Promise((resolve, reject) => {
      const sql = 
          "UPDATE conversations SET last_message = ?, updated_at = now() WHERE idx = ?";
      
      pool.query(sql, [messageData.contents, messageData.conversation_idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) { // conversation 업데이트 완료
            resolve(rows);
          } else {
            const _err = new Error("Update Conversation Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};