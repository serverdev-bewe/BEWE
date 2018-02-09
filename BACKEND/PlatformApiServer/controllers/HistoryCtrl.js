'use strict';

const historyModel = require('../models/HistroyModel');


exports.fetchResult = async(req, res, next) => {
  let result = '';
  let temp = '';

  try {
    const inputData = {
      game_idx: req.body.game_idx,
      data : JSON.stringify(req.body.data),
    };

    result = await historyModel.fetchResult(inputData);

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};