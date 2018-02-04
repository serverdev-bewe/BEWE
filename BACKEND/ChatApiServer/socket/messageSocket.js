'use strict';

const messageCtrl = require('../controllers/MessageCtrl');
const socketIO = require('socket.io');
let io = null;
let clients = [];

exports.io = () => {
  return io;
};

exports.clients = () => {
  return clients;
}

exports.initialize = () => {
  const PORT = 4002;  
  
  const server = require('http').createServer();
  server.listen(PORT, () => {
    console.info(`[BEWE-MessageSocketServer] Listening on Port ${PORT}`);
  });

  io = require('socket.io')(server, { origins: '*:*'});
  
  io.on('connection', (socket) => { // 웹 소켓 연결
    socket.on('storeClientInfo', function (data) {
      var clientInfo = new Object();
      clientInfo.customId = data.customId;
      clientInfo.clientId = socket.id;
      clients.push(clientInfo);
      console.log('Socket 연결이 시작되었습니다!', data.customId);
    }); 

    socket.on('send-message', async (conversationIdx, userIdx, contents) => {
      console.log('server-received-send-message : ', contents);

      const data = await messageCtrl.sendMessage(conversationIdx, userIdx, contents);
      socket.to(getClientId(data.receiverIdx)).emit('new-message', data.insertId);
    });

    socket.on('enter conversation', (conversation) => {
      socket.join(conversation);
    });
  
    socket.on('leave conversation', (conversation) => {
      socket.leave(conversation);
    });
  
    socket.on('new message', (conversation) => {
      io.sockets.in(conversation).emit('refresh messages', conversation);
    });
  
    socket.on('disconnect', function (data) {
      for(let i=0, len=clients.length; i<len; ++i) {
        let c = clients[i];

        if(c.clientId === socket.id) {
          clients.splice(i,1);
          break;
        }
      }
    });
  });  
};

function getClientId(customId) {
  let result = '';

  for(let i=0; i<clients.length; i++) {
    if(clients[i].customId === customId) {
      result = clients[i].clientId;
      break;
    }
  }

  return result;
}