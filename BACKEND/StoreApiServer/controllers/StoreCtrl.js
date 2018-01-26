'use strict';

const storeModel = require('../models/StoreModel');


exports.purchase = async(req, res, next) => {
  const result = '';


  try {
    const inputData = {

    }


  } catch (error){

    console.log(error);
    return next(error)
  }

  return res.json(result);

};