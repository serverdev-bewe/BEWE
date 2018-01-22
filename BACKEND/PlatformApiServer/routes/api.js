'use strict';

const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');
const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list);

  router.route('/users/friends/sendList')
    .get(authCtrl.auth, friendCtrl.sendList);

  router.route('/users/friends/receiveList')
    .get(authCtrl.auth, friendCtrl.receiveList);

  router.route('/users/friends/send')
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/accept')
    .post(authCtrl.auth, friendCtrl.accept);

  router.route('/users/friends/refuse')
    .post(authCtrl.auth, friendCtrl.refuse);

  router.route('/noti')
    .get(notiCtrl.list.index);
    
  router.route('/noti/list')
    .get(notiCtrl.list.list);

  // router.route('/noti/create')
  //   .post(notiCtrl.list.create);
    
  return router;
}