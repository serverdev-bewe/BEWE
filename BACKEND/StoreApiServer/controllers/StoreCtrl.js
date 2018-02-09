'use strict';

const storeModel = require('../models/StoreModel');


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
exports.lists = async(req, res, next) => {
  let result = '';
  try {
    const inputData = {
      userIdx: req.userIdx,
    };
    result = await storeModel.lists(inputData);
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


  try {
    const inputData = {
      userIdx: req.userIdx,
      gameIdx: req.params.idx,
    };

    result = await storeModel.purchase(inputData);

  } catch (error){
    return next(error)
  }

  return res.r(result);

};



exports.friendLists = async(req, res, next) => {
  let result = '';

  try{
    const inputData = {
      sender: req.userIdx,
      receiver: req.params.idx,
    };


    result = await storeModel.checkFriend(inputData);

    if (result.flag === 1 ){
      result = await storeModel.lists(inputData.receiver);
    } else {
      return res.json({
        "status": false,
        "message": "not a friend"
      })
    }
  } catch (error) {
    return next(error);
  }

  return res.r(result);
};