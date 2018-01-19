'use strict';

const notiModel = require('../models/NotiModel');

module.exports = (io) => {
  io.on('connection', (socket) => { // 웹 소켓 연결
    console.log('Socket 연결이 시작되었습니다!');

    socket.on('notiCreate', async (data) => {
      console.log("Socket : notiCreate 이벤트 발생");
      const result = await notiModel.create(data);
      socket.broadcast.emit('notiSend', result);
    });
  });
}