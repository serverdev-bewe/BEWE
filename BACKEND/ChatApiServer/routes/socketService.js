module.exports = function(server) {
  var io = require('socket.io')(server);
  var rooms = [];
  var readyUsers = [];
  // let roomReadyCount = 0;
  var a = io.of('/')
  io.on('connection', socket => {
    const username = socket.handshake.query.username;
    const usernamea = socket.handshake.query.username;
    
    let roomIdx;
    console.log(`${username} connected`);

    socket.on('client:message', data => {
      console.log(`${data.username}: ${data.message}`);
      socket.in(data.roomSeq).emit('server:message', data);
    });
    socket.on('joinRoom', data =>{
      console.log(data.username + '님은 '+ data.roomSeq +'번 방에 접속하셨습니다. 환영합니다!');
      roomIdx = data.roomSeq;
      socket.join(roomIdx);

      rooms.push(username);
      
      io.sockets.in(roomIdx).emit('chattReadyOk', {
        readyUsers: readyUsers
      });
      io.sockets.in(roomIdx).emit('addMember', {
        'name' : data.username,
        'id' : socket.id,
        'roomSeq': roomIdx,
        'rooms':rooms
      });
      
      io.sockets.in(roomIdx).emit('server:message', {
        username : '::: SYSTEM :::',
        message : data.username+'님이 접속하셨습니다.'
      });
    });


    socket.on('chattReady', data=>{
      // roomReadyCount++;
      readyUsers.push(data.username);
      io.sockets.in(roomIdx).emit('chattReadyOk', {
        readyUsers: readyUsers
        // , readyCnt : 1
      });

      io.sockets.in(roomIdx).emit('chattReadyCnt', {
        data: 1
      });
    });

    socket.on('gameStart', data=>{
      console.log(data);
    })


    socket.on('disconnect', (data) => {
      io.sockets.in(roomIdx).emit('server:message', {
        username : '::: SYSTEM :::',
        message : `${usernamea}님이 나가셨습니다.`
      });
      socket.leave(roomIdx);

      rooms = rooms.filter(function(ele){
        return ele != usernamea
      });
      readyUsers = readyUsers.filter(function(ele){
        return ele != usernamea
      });

      io.sockets.in(roomIdx).emit('addMember', {
        'name' : data.username,
        'id' : socket.id,
        'roomSeq': roomIdx,
        'rooms':rooms
      });
      io.sockets.in(roomIdx).emit('chattReadyOk', {
        readyUsers: readyUsers
      });

      console.log(`${username} disconnected`);

      // if(roomReadyCount == 0){
      //   return
      // }
      // roomReadyCount--;
    });
  });

  return io;
}