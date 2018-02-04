'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const transactionWrapper = require('./TransactionWrapper');


exports.allowContent = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      UPDATE games SET games.flag = 1
      WHERE games.idx = ?
      LIMIT 1;
      `;
    pool.query(sql, [inputData.gameIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};