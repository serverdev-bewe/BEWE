'use strict';

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

exports.game = (type) => {  
  return async(req, res, next) => {
    if (type === 'buy') {
      client.zrevrange('game_has_users', 0, -1, 'withscores', (err, sorted) => {
        let result = {};

        console.log(sorted);
        console.log(sorted.length);
        
        for (let i=0; i<sorted.length/2; i+=2) {
          result[sorted[i]] = sorted[i+1];
        }
        console.log(JSON.stringify(result)); 
      });
    } else if (type === 'time') {

    }
  }
}