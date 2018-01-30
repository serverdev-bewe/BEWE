'use strict';

const socketIO = require('socket.io');
let io = null;

exports.io = () => {
  return io;
};

exports.initialize = () => {
  const PORT = 4002;
  io = socketIO().listen(PORT);
  console.info(`[BEWE-MessageSocketServer] Listening on Port ${PORT}`);
  
  io.on('connection', (socket) => { // 웹 소켓 연결
    console.log('Socket 연결이 시작되었습니다!');

    socket.on('enter conversation', (conversation) => {
      socket.join(conversation);
    });
  
    socket.on('leave conversation', (conversation) => {
      socket.leave(conversation);
    });
  
    socket.on('new message', (conversation) => {
      io.sockets.in(conversation).emit('refresh messages', conversation);
    });
  
    socket.on('disconnect', () => {});
  });  
};