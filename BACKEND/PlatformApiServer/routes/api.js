'use strict';

const validate = require('express-validation');

const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  router.route('/noti')
    .get(notiCtrl.list.index);
    
  router.route('/noti/list')
    .get(notiCtrl.list.list);

  // router.route('/noti/create')
  //   .post(notiCtrl.list.create);
    
  return router;
}