const redis = require('redis');
const redis2 = require('socket.io-redis');

module.exports = function(server) {
  const io = require('socket.io')(server);

  let rooms = [];
  let readyUsers = [];

  const pub = redis.createClient(6379, '52.78.25.56');
  const sub = redis.createClient(6379, '52.78.25.56');

  sub.on("message", function (channel, data) {
    data = JSON.parse(data);
    console.log("Redis_Sub: channel " + channel + ": " + (data.sendType));
    if (parseInt("sendToSelf".localeCompare(data.sendType)) === 0) {
        io.emit(data.method, data.data);
    }else if (parseInt("sendToAllConnectedClients".localeCompare(data.sendType)) === 0) {
        io.sockets.emit(data.method, data.data);
    }else if (parseInt("sendToAllClientsInRoom".localeCompare(data.sendType)) === 0) {
        io.sockets.in(channel).emit(data.method, data.data);
    }       
  });
  sub.on('subscribe',function (channel, count) {
    console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
  });
  
  io.on('connection', socket => {
    const username = socket.handshake.query.username;
    const usernamea = socket.handshake.query.username;
    const gameSeq = socket.handshake.query.gameSeq;

    console.log('gameSeq : ' +gameSeq);
    //gameSeq값을 namespace로 설정해 서버 분리해주면 될 듯
    let roomIdx;
    console.log(`${username} connected`);

    socket.on('client:message', data => {
      console.log(`${data.username}: ${data.message}`);
      let reply = JSON.stringify({
        method: 'server:message',
        sendType: 'sendToAllClientsInRoom',
        data: data
      })
      pub.publish(data.roomSeq, reply);
    });

    socket.on('joinRoom', data =>{
      console.log(data.username + '님은 '+ data.roomSeq +'번 게임에 접속하셨습니다. 환영합니다!');
      roomIdx = data.roomSeq;

      socket.join(roomIdx);
      rooms.push(username);

      sub.subscribe(data.roomSeq);

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
      io.sockets.in(roomIdx).emit('chattReadyOk', {
        readyUsers: readyUsers
      });

      io.sockets.in(roomIdx).emit('chattReadyCnt', {
        data: 1
      });
    });

    socket.on('gameStart', data=>{
      console.log(data);
    })


    socket.on('disconnect', (data) => {
      // sub.quit();
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