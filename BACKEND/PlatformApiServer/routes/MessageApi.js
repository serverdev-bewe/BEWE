const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const messageCtrl = require('../controllers/MessageCtrl');
const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {

  /* Message */
  router.route('/messages')
    .get(authCtrl.auth, messageCtrl.list('conversations'));

  router.route('/messages/create')
    .post(authCtrl.auth, messageCtrl.openConversation);

  router.route('/messages/:idx')
    .get(authCtrl.auth, messageCtrl.list('messages'))
    .post(authCtrl.auth, messageCtrl.sendMessage);

  router.route('/noti/list')
    .get(notiCtrl.list);

  router.route('/noti/create')
    .get(notiCtrl.create);

  // router.route('/noti/check')
  //   .get(notiCtrl.check);

  return router;
};