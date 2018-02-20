const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
// const pool = mysql.createPool(DBConfig);

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

let pool;
module.exports.pool = pool;
module.exports.createDBPool = () => {
  this.pool = mysql.createPool(DBConfig);
};
module.exports.client = client;
