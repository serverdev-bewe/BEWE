'use strict';

const notiModel = require('../models/NotiModel');
const io = require('../controllers/SocketCtrl');

// 알림 리스트
module.exports.list = async (req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;

    result = await notiModel.list(userData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result);
};

// 알림 생성
module.exports.create = async (req, res, next) => {
  let result = '';

  try {
    const notificationData = {
      usersIdx: req.body.users_idx,
      type: req.body.type,
      info: req.body.info
    }    

    result = await notiModel.create(notificationData);    
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
};

// 알림 확인
module.exports.check = async (req, res, next) => {
  let result = '';
  try {
    const notiIdx = req.params.idx;
    const userData = req.userIdx;

    result = await notiModel.check(notiIdx, userData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
};