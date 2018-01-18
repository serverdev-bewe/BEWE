'use strict';

const notiModel = require('../models/NotiModel');

module.exports.list = {
  index: (req, res, next) => {
    if(!req.session.uid)
      req.session.uid = Math.floor(Math.random() * 4) + 1;
    let result = "user id는 " + req.session.uid;
    console.log(result);
    
    return res.status(201).json(result);
  },

  list: async (req, res, next) => {
    let result;
    if(!req.session.uid){
      req.session.uid = Math.floor(Math.random() * 2) + 1;
      console.log("user id는 " + req.session.uid);
    }
    result = await notiModel.list(req.session.uid);
    console.dir(result);
    console.log("2");
    return res.status(201).json(result);
  },

  create: async (req, res, next) => {
    result = await notiModel.create();
    return res.status(201).json(result);
  }
};