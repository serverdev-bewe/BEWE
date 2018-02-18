// 'use strict';

const hashModel = require('../models/hashModel');

// 내 친구 리스트
exports.list = async(req, res, next) => {
  let result ='';
  try {
    const hashIdx = req.params.string;
    let hashString;
    
    if(hashIdx == 2){
        hashString = '베스트UGC';
    }

    result = await hashModel.list(hashString)
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result);
};