'use strict';

const authModel = require('../models/AuthModel');

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

function fetchRedisData(res, redisQueryKey, userIdx) {
  client.zrevrange(redisQueryKey, 0, -1, 'withscores', (err, sorted) => {
    let result = {};
    result.all = [];
    let data, count;

    for (let i=0, j=0; j<sorted.length/2; j++, i++) {
      data = JSON.parse(sorted[i]);
      count = parseInt(sorted[++i]);
      result.all[j] = {
        rank: j+1,
        data,
        count
      }

      if (userIdx && userIdx === data.userIdx) {
        console.log(1);
        result.currentUser = result.all[j];
      }
      
      if (j<1) continue;

      if (count === result.all[j-1].count) {
        result.all[j].rank = result.all[j-1].rank;
      }      
    }
    
    console.log(result);
    return res.status(200).json(result);
  });
}

exports.buy = (type) => {  
  return async(req, res, next) => {   
    let userIdx = null;
    let redisQueryKey = '';

    if (type === 'users') {
      redisQueryKey = 'user_has_games';
    } else if (type === 'games') {
      redisQueryKey = 'game_has_users';
    }    

    if (req.headers.token) {
      authModel.auth(req.headers.token, (err, result) => {
        if (!err) {
          userIdx = result;
          fetchRedisData(res, redisQueryKey, userIdx);
        }
      });
    } else {
      fetchRedisData(res, redisQueryKey);
    }
  };    
}