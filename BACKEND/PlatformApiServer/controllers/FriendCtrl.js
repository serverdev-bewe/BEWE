'use strict';

const friendModel = require('../models/FriendModel');

// 내 친구 리스트
exports.list = (type) => {
  return async(req, res, next) => {
    let result ='';
    try {
      const userData = req.userIdx;

      result = await friendModel.list(type, userData)
    } catch (error) {
      console.log(error);
      return next(error)
    }
    return res.json(result);
  }
};

// 친구 추가
exports.send = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;
    const receiver_idx = req.body.receiver_idx;

    result = await friendModel.send(userData, receiver_idx);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
};

// 친구 요청 수락, 거절
exports.handleRequest = (type) => {
  return async(req, res, next) => {
    let result = '';
    try {
      const userData = req.userIdx;
      const idx = req.body.idx;

      result = await friendModel.handleRequest(type, userData, idx);
    } catch (error) {
      console.log(error);
      return next(error);
    }
    return res.status(201).json(result);
  }
};