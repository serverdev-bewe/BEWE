module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', socket => {
    const username = socket.handshake.query.username;
    let roomIdx;
    console.log(`${username} connected`);
    let rooms = [];

    socket.on('client:message', data => {
      console.log(`${data.username}: ${data.message}`);
      socket.in(data.idx).emit('server:message', data);
    });
    socket.on('joinRoom', data =>{
      console.log(data.username + '님은 '+ data.idx +'번 방에 접속하셨습니다. 환영합니다!');
      roomIdx = data.idx;
      socket.join(roomIdx);

      io.sockets.in(roomIdx).emit('addMember', {
        'name' : data.username,
        'id' : socket.id,
        'idx': roomIdx,
        'rooms':rooms
      });
      
      io.sockets.in(roomIdx).emit('server:message', {
        username : '::: SYSTEM :::',
        message : data.username+'님이 접속하셨습니다.'
      });
    });
    socket.on('roomList', data=>{

    });
    socket.on('disconnect', (data) => {
      console.log(roomIdx + '  dis');
      socket.leave(roomIdx);
      
      console.log(`${username} disconnected`);
    });
  });

  return io;
}