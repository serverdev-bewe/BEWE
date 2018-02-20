const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
// const pool = mysql.createPool(DBConfig);

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

let pool;
exports.pool = pool;
exports.createDBPool = () => {
  this.pool = mysql.createPool(DBConfig);
};

exports.client = client;
