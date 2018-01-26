const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');

const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {

  router.route('/noti/list')
    .get(notiCtrl.list);

  router.route('/noti/create')
    .get(notiCtrl.create);

  // router.route('/noti/check')
  //   .get(notiCtrl.check);

  return router;
};