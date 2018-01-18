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

exports.create = () => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO notifications (users_idx, contents, url, flag) " +
      "VALUES (1, '하하하하하하하하하하하', 'http://www.naver.com', 0)";

    pool.query(sql, (err, result) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(result);
      }
    });
  });
};