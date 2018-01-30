module.exports = function(server) {
  var io = require('socket.io')(server);
  var rooms = [];
  var readyUsers = [];
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
      readyUsers.push(data.username);
      // readyUsers = rooms.filter(function(ele){
      //   return ele 
      // })
      io.sockets.in(roomIdx).emit('chattReadyOk', {
        readyUsers: readyUsers
        // readyUsers: data.username
      });
    });


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
    });
  });

  return io;
}