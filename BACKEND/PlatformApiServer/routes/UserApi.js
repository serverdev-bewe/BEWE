const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list)
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/accept')
    .post(authCtrl.auth, friendCtrl.accept);

  router.route('/users/friends/reject')
    .post(authCtrl.auth, friendCtrl.reject);

  return router;
};