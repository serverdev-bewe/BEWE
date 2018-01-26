'use strict';


const imageCtrl = require('../controllers/ImageCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const cmsCtrl = require('../controllers/CMSCtrl');

module.exports = (router) => {

  router.route('/cms/register')
    .post(imageCtrl.uploadArray, authCtrl.auth, cmsCtrl.register);

  return router;
};