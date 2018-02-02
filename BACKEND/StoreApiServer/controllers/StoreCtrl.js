'use strict';

const storeModel = require('../models/StoreModel');

exports.list = async(req, res, next) => {
  let result = '';
  try {
    const inputData = {
      userIdx: req.userIdx,
    };
    result = await storeModel.list(inputData);
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
      gameIdx: req.body.gameIdx,
    };

    result = await storeModel.purchase(inputData);

  } catch (error){
    return next(error)
  }

  return res.r(result);

};