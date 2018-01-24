'use strict';

const notiModel = require('../models/NotiModel');
const io = require('../controllers/SocketCtrl');

// 알림 리스트
module.exports.list = async (req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;

    result = await friendModel.list(userData);
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json(result);
};

// 알림 생성
module.exports.create = async (req, res, next) => {
  console.log("noti create");
  return res.json({"asdf" : "asdf"});
};