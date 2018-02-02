const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const messageCtrl = require('../controllers/MessageCtrl');

module.exports = (router) => {

  /* Message */
  router.route('/messages')
    .get(authCtrl.auth, messageCtrl.list('conversations'))
    .post(authCtrl.auth, messageCtrl.openConversation);

  router.route('/messages/:idx')
    .get(authCtrl.auth, messageCtrl.list('messages'))
    .post(authCtrl.auth, messageCtrl.sendMessage);

  return router;
};