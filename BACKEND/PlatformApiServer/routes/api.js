'use strict';

const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');
const messageCtrl = require('../controllers/MessageCtrl');
const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list('all'))
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/send')
    .get(authCtrl.auth, friendCtrl.list('send'))

  router.route('/users/friends/receive')
    .get(authCtrl.auth, friendCtrl.list('receive'));

  router.route('/users/friends/accept/:idx')
    .get(authCtrl.auth, friendCtrl.accept);

  router.route('/users/friends/reject/:idx')
    .get(authCtrl.auth, friendCtrl.reject);


  /* Message */
  router.route('/messages')
    .get(authCtrl.auth, messageCtrl.list('conversations'))
    .post(authCtrl.auth, messageCtrl.openConversation);

  router.route('/messages/:idx')
    .get(authCtrl.auth, messageCtrl.list('messages'))
    .post(authCtrl.auth, messageCtrl.sendMessage);


  /* Notification */  
  router.route('/users/noti')
    .get(authCtrl.auth, notiCtrl.list);
  
  router.route('/users/noti/:idx')
    .get(authCtrl.auth, notiCtrl.check);

  return router;
};