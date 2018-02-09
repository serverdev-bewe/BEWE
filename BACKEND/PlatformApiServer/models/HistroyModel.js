'use strict';

const mysql = require('mysql');

const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);


exports.fetchResult = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      INSERT INTO game_result(games_idx, data)
      VALUES (?, ?)
      `;

    pool.query(sql, [inputData.game_idx, inputData.data], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.affectedRows === 1) {
          resolve(rows[0]);
        } else {
          const _err = new Error("GAME RESULT INSERT CUSTOM ERR");
          reject(_err);
        }
      }
    });
  }).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT
          data
        FROM game_result
        WHERE idx = ? 
        `;
      pool.query(sql, result.insertId, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      })
    })
  })
};

