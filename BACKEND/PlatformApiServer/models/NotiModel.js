'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

exports.list = (uid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM notifications WHERE users_idx = ?";
    
    pool.query(sql, [uid], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        //console.dir(rows);
        console.log("1");
        resolve(rows);
      }
    });
  });  
};

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 
      "INSERT INTO notifications (users_idx, contents, url, flag) " +
      "VALUES (?, ?, 'http://www.naver.com', 0)";

    pool.query(sql, [data.uid, data.contents], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        if (rows.affectedRows === 1) {
          resolve(rows);
        } else {
          const _err = new Error("notification 생성 중 에러 발생");
          reject(_err);
        }
      }
    });
  }).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT users_idx, contents, url, flag FROM notifications " +
        "WHERE idx = ?";

      pool.query(sql, [result.insertId], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);  
        }else{
          resolve(rows[0]);
        }
      });
    });
  });
};