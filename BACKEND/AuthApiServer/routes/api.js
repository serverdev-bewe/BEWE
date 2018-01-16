'use strict';

const validate = require('express-validation');
const ParamValidation = require('../config/ParamValidation');

const imageCtrl = require('../controllers/ImageCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');


module.exports = (router) => {


  // USER
  router.route('/users/register')
    .post(userCtrl.register);
  router.route('/users/check')
    .post(userCtrl.check);

  router.route('/users/login')
    .post(userCtrl.login);

  // PROFILE
  router.route('/users')
    .get(authCtrl.auth, userCtrl.profile);





  return router;
};