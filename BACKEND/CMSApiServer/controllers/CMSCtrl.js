'use strict';

const cmsModel = require('../models/CMSModel');


exports.register = async(req, res, next) => {
  let result = '';

  let images = [];
  // TODO 이미지 없는경우 예외처리
  if (!req.files) { // 이미지가 없는 경우
    images.push(null)
  } else {
    req.files.map((file) => {
      images.push(file.location);
    })
  }

  try{
    const inputData = {
      userIdx: req.userIdx,
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      images: images
    };

    result = await cmsModel.register(inputData);
    result.urls = result.urls.split(',')
  } catch (error) {
    console.log(error);
    return next(error);
  }


  return res.r(result);
};


