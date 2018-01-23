'use strict';

var socketIO = require('socket.io');
var io = null;

exports.io = () => {
  return io;
}

exports.initialize = (server) => {
  io = socketIO(server);

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
}