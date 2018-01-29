'use strict';

const roomCtrl = require('../controllers/RoomCtrl');
const authCtrl = require('../controllers/AuthCtrl');

module.exports = (router) =>{
    router.route('/roomList')
        .get(authCtrl.checkSession, authCtrl.auth, roomCtrl.findSeq);
    router.route('/createroom')
        .get(roomCtrl.createRoom);
    return router;
};