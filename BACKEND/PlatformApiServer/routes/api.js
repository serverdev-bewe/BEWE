'use strict';

const validate = require('express-validation');

const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  router.route('/noti')
    .get(notiCtrl.index);
    
  router.route('/noti/list')
    .get(notiCtrl.list);

  router.route('/noti/create')
    .post(notiCtrl.create);
    
  return router;
}