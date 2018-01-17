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

exports.create = (req) => {

}