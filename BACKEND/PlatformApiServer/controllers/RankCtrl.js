'use strict';

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

exports.game = (type) => {  
  return async(req, res, next) => {
    if (type === 'buy') {
      client.zrevrange('user_has_games', 0, -1, 'withscores', (err, sorted) => {
        console.log(sorted);
        let result = [];
        let users_idx, count;

        for (let i=0, j=0; j<sorted.length/2; j++, i++) {
          users_idx = parseInt(sorted[i]);
          count = parseInt(sorted[++i]);

          result[j] = {
            rank: j+1,
            users_idx,
            count
          }
          
          if (j<1) continue;

          if (count === result[j-1].count) {
            result[j].rank = result[j-1].rank;
          }
        }
        
        return res.status(200).json(result);
      });
    } else if (type === 'time') {

    }
  }
}

exports.user = (type) => {
  return async(req, res, next) => {
    if(type === 'buy') {
      client.zrevrange('game_has_users', 0, -1, 'withscores', (err, sorted) => {
        console.log(sorted);
        let result = [];
        let users_idx, count;

        for (let i=0, j=0; j<sorted.length/2; j++, i++) {
          users_idx = parseInt(sorted[i]);
          count = parseInt(sorted[++i]);

          result[j] = {
            rank: j+1,
            users_idx,
            count
          }
          
          if (j<1) continue;

          if (count === result[j-1].count) {
            result[j].rank = result[j-1].rank;
          }
        }
        
        return res.status(200).json(result);
      });
    } else if (type === 'time') {

    }
  }
} 