'use strict';

const friendModel = require('../models/FriendModel');

// 내 친구 리스트
exports.list = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.userIdx;

    result = await friendModel.list(userData)
  } catch (error) {
    console.log(error);
    return next(error)
  }
  return res.json(result);
}

// 받은 친구 요청
exports.receiveList = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.userIdx;

    result = await friendModel.receiveList(userData)
  } catch (error) {
    console.log(error);
    return next(error)
  }
  return res.json(result);
}

// 보낸 친구 요청
exports.sendList = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.userIdx;

    result = await friendModel.sendList(userData)
  } catch (error) {
    console.log(error);
    return next(error)
  }
  return res.json(result);
}

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
}

// 친구 요청 수락
exports.accept = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;
    const idx = req.body.idx;

    result = await friendModel.accept(userData, idx);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  console.log("2");
  console.log(result);
  return res.status(201).json(result);
}

// 친구 요청 거절
exports.refuse = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;
    const idx = req.body.idx;

    result = await friendModel.refuse(userData, idx);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
}

