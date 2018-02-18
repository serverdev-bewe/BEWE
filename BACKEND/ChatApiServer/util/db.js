const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
const pool = mysql.createPool(DBConfig);

module.exports.pool = pool;