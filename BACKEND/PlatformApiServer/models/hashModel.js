'use strict';

const pool = require('../util/db').pool;

exports.list = (hashString, page) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM hash WHERE hash_string = ?";
    
    pool.query(sql, [hashString], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};