'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const transactionWrapper = require('./TransactionWrapper');

/*************
 * 게임 등록
 * @param inputData
 * @returns {Promise<any>}
 *************/
exports.register = (inputData) => {
  let insertedIdx;
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
      .then(transactionWrapper.beginTransaction)
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            INSERT INTO games (users_idx, title, genre, description, image)
            VALUES (?, ?, ?, ?, ?) 
            `;
          context.conn.query(sql,
            [
              inputData.userIdx, inputData.title,
              inputData.genre, inputData.description,
              inputData.images[0]
            ], (err, rows)=> {
            if (err) {
              context.error = err;
              reject(context)
            } else {
              if (rows.affectedRows === 1) { // 쓰기 시도 성공
                insertedIdx = rows.insertId;
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("GAME REGISTER CUSTOM ERROR 1");
                reject(context)
              }
            }
            })
        })
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          let images = [];
          for(let i = 0; i<inputData.images.length;i++) {
            images[i] = [context.result.insertId];
            images[i].push(inputData.images[i])
          }
          const sql =
            `
            INSERT INTO game_images(games_idx, url)
            VALUES ?
            `;
          context.conn.query(sql, [images], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context);
            } else {
              if (rows.affectedRows === (inputData.images.length)) {
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("GAME REGISTER CUSTOM ERROR 2");
                reject(context);
              }
            }
          })
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
           SELECT
            g.idx,
            g.title,
            g.genre,
            g.description,
            g.created_at,
            GROUP_CONCAT(gi.url) AS urls
          FROM games AS g
            LEFT JOIN game_images AS gi ON gi.games_idx = g.idx
          WHERE g.idx = ?
            `;
          context.conn.query(sql, [insertedIdx], (err, rows) => {
            if(err){
              context.error = err;
              reject(context);
            } else {
              context.result = rows[0];
              resolve(context);
            }
          });
        });
      })
      .then(transactionWrapper.commitTransaction)
      .then((context) => {
        context.conn.release();
        resolve(context.result);
      })
      .catch((context) => {
        context.conn.rollback(() => {
          context.conn.release();
          reject(context.error);
        })
      })
  });
};


