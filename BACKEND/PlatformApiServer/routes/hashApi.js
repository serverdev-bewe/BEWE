const hashCtrl = require('../controllers/HashCtrl');

module.exports = (router) => {

  router.route('/home/hash/:string')
    .get(hashCtrl.list);

  return router;
};