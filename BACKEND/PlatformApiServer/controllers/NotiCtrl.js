'use strict';

const notiModel = require('../models/NotiModel');
const io = require('../controllers/SocketCtrl');

module.exports.list = async (req, res, next) => {
  let result;
  
  result = await notiModel.list(Math.floor(Math.random() * 2) + 1);
  console.dir(result);
  console.log("2");
  return res.status(201).json(result);
};

module.exports.create = async (req, res, next) => {
  console.log("noti create");
  return res.json({"asdf" : "asdf"});
};