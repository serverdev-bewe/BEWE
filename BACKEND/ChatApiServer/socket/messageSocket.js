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
  const PORT = 4092;  
  
  const server = require('http').createServer();
  server.listen(PORT, () => {
    console.info(`[BEWE-MessageSocketServer] Listening on Port ${PORT}`);
  });

  io = require('socket.io')(server, { origins: '*:*'});
  
  io.on('connection', (socket) => { // 웹 소켓 연결
    socket.on('store_client_info', function (data) {
      var clientInfo = new Object();
      clientInfo.customId = data.customId;
      clientInfo.clientId = socket.id;
      clients.push(clientInfo);
    }); 

    socket.on('send_message', async (conversationIdx, userIdx, contents) => {
      const data = await messageCtrl.sendMessage(conversationIdx, userIdx, contents);
      socket.to(getClientId(data.receiverIdx)).emit('new_message', 
      {

        messageIdx: data.insertId,
        senderIdx: userIdx,
        contents: contents
      });
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