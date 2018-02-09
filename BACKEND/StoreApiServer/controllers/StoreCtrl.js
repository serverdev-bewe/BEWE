'use strict';

const storeModel = require('../models/StoreModel');
const client = require('redis').createClient(6379, '52.78.25.56');

exports.listAll = async(req, res, next) => {

  let result = '';

  try{

    result = await storeModel.listAll();
  } catch (error) {
    return next(error);
  }

  return res.r(result);
};



/*******
 * 유저가 구매한 게임 리스트 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
exports.myList = async(req, res, next) => {
  let result = '';
  try {
    const inputData = {
      userIdx: req.userIdx,
    };
    result = await storeModel.myList(inputData);
  } catch (error) {
    return next(error);
  }

  return res.r(result);
};


/***********
 * 게임 구매
 * TODO 중복 구매 예외처리
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.purchase = async(req, res, next) => {
  let result = '';
  const userIdx = req.userIdx;
  const gameIdx = req.params.idx;

  try {
    const inputData = {
      userIdx,
      gameIdx
    };

    result = await storeModel.purchase(inputData);
    
    if (result !== '') {
      client.zscore("user_has_games", userIdx, (err, score) => {
        if (score) {
          client.zadd("user_has_games", parseInt(score) + 1, userIdx, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          client.zadd("user_has_games", 1, userIdx, (err, result) => {
            if (err) {
              console.log(err);
            }
          })
        }
      });

      client.zscore("game_has_users", gameIdx, (err, score) => {
        if (score) {
          client.zadd("game_has_users", parseInt(score) + 1, gameIdx, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          client.zadd("game_has_users", 1, gameIdx, (err, result) => {
            if (err) {
              console.log(err);
            }
          })
        }
      });
    }
  } catch (error){
    return next(error)
  }

  return res.r(result);

};