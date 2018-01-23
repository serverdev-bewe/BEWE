'use strict';

const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');
const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list('all'));

  router.route('/users/friends/sendList')
    .get(authCtrl.auth, friendCtrl.list('send'));

  router.route('/users/friends/receiveList')
    .get(authCtrl.auth, friendCtrl.list('receive'));

  router.route('/users/friends/send')
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/accept')
    .post(authCtrl.auth, friendCtrl.handleRequest('accept'));

  router.route('/users/friends/reject')
    .post(authCtrl.auth, friendCtrl.handleRequest('reject'));


  router.route('/noti/list')
    .get(notiCtrl.list);

  router.route('/noti/create')
    .get(notiCtrl.create);
  return router;
}