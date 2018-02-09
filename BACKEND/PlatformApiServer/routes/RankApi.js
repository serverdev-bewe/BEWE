const validate = require('express-validation');

const rankCtrl = require('../controllers/RankCtrl');

module.exports = (router) => {

  router.route('/ranks/games/time')
    .get(rankCtrl.game('time'));
  
  router.route('/ranks/games/buy')
    .get(rankCtrl.game('buy'));

  router.route('/ranks/users/time')
    .get(rankCtrl.user('time'));

  router.route('/ranks/users/buy')
    .get(rankCtrl.user('buy'));

  return router;
};