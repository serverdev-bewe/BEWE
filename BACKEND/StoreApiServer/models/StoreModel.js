'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

exports.purchase = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      
      `;
    pool.query(sql, )
  });
};