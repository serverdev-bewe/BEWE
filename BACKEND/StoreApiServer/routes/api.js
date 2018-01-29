'use strict';


const imageCtrl = require('../controllers/ImageCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const storeCtrl = require('../controllers/StoreCtrl');



module.exports = (router) => {

  router.route('/store')
    .get(authCtrl.auth, storeCtrl.list)
    .post(authCtrl.auth, storeCtrl.purchase);

  return router;
};