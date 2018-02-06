'use strict';

const notiModel = require('../models/NotiModel');
const eventEmitter = require('../controllers/EventCtrl');
let status = 'DEFAULT';

// 알림 리스트
module.exports.list = async (req, res, next) => {
  let result = '';
  const page = req.params.page || 1;

  try {
    const userData = req.userIdx;
    result = await notiModel.list(userData, page);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result);
};

module.exports.new = async (req, res, next) => {
  let result = '';

  try {
    const userData = req.userIdx;

    result = await notiModel.new(userData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result.length);
}

// 알림 생성
module.exports.create = async (usersIdx, type, info) => {
  let result = '';
  try {
    const notificationData = {
      usersIdx,
      type,
      info
    };

    result = await notiModel.create(notificationData);    
  } catch (error) {
    console.log(error);
    return next(error);
  }

  status = 'CREATE_NOTIFICATION';
  return result;
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

module.exports.polling = async (req, res, next) => {
  const date = new Date();
  const userData = req.userIdx;
  let result = '';
  
  console.log(">> LONG POLLING LOOP START");
  
  while(true){
    try {
      if(status === 'CREATE_NOTIFICATION') {
        result = await notiModel.polling(userData, date);
        status = 'DEFAULT';
        break;
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }   
    await sleep(500);
  }
  console.log(">> LONG POLLING END");
  console.log(result);
  return res.status(200).json(result);
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}