'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

// 친구 리스트
exports.list = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM friends WHERE (flag = 0) AND (sender_idx = ? OR receiver_idx = ?)";
    
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

// 받은 친구 요청
exports.receiveList = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM friends WHERE flag = 0 AND receiver_idx = ?";
    
    pool.query(sql, [userData], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });  
};

// 보낸 친구 요청
exports.sendList = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM friends WHERE flag = 0 AND sender_idx = ?";
    
    pool.query(sql, [userData], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });  
};

// 친구 요청 전송
exports.send = (userData, receiver_idx) => {
  return new Promise((resolve, reject) => {
    if(userData == receiver_idx){ // 요청한 사람과 받은 사람의 id가 같을 경우 캔슬
      reject(2402);
    }

    const sql = 
      "SELECT idx FROM friends WHERE (sender_idx = ? AND receiver_idx = ?) " + 
                                 "OR (receiver_idx = ? AND sender_idx = ?)";
    
    pool.query(sql, [userData, receiver_idx, userData, receiver_idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) { // 이미 친구 요청을 보냈을 경우
          reject(2401);
        }else{
          resolve(null);
        }
      }
    });
  }
).then(() => {
  return new Promise((resolve, reject) => {
    const sql = 
      "INSERT INTO friends " +
      "(flag, sender_idx, receiver_idx) VALUES (0, ?, ?)";

      pool.query(sql, [userData, receiver_idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("Friends send Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};

// 친구 요청 수락
exports.accept = (userData, idx) => {  
  return new Promise((resolve, reject) => {
    const sql = 
      "SELECT flag, receiver_idx FROM friends WHERE idx=?";
    pool.query(sql, [idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) { // 일치하는 친구 요청이 있을 경우 
          if (rows[0].receiver_idx == userData && rows[0].flag == 0){ 
            // 친구 요청의 수신자와 current_user의 id가 같고, flag가 0일 때만 업데이트
            resolve(idx);
          } else {
            reject(2402);
          }
        } else {
          reject(400);
        }
      }
    });
  }
).then((idx) => {
  return new Promise((resolve, reject) => {
    const sql = 
      "UPDATE friends SET flag = 1 WHERE idx = ?";

      pool.query(sql, [idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) {
            console.log("1");
            resolve(rows);
          } else {
            const _err = new Error("Friends accept Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};

// 친구 요청 거절
exports.refuse = (userData, idx) => {  
  return new Promise((resolve, reject) => {
    const sql = 
      "SELECT flag, receiver_idx FROM friends WHERE idx=?";
    pool.query(sql, [idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) { // 일치하는 친구 요청이 있을 경우 
          if (rows[0].receiver_idx == userData && rows[0].flag == 0){ 
            // 친구 요청의 수신자와 current_user의 id가 같고, flag가 0일 때만 업데이트
            resolve(idx);
          } else {
            reject(2402);
          }
        } else {
          reject(400);
        }
      }
    });
  }
).then((idx) => {
  return new Promise((resolve, reject) => {
    const sql = 
      "UPDATE friends SET flag = 2 WHERE idx = ?";

      pool.query(sql, [idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) {
            console.log("1");
            resolve(rows);
          } else {
            const _err = new Error("Friends accept Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};