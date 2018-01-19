var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* 세션 부분 (추후 삭제) */
var session = require('express-session');

app.use(session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

app.use((req, res, next) => {
  res.r = (result) => {
    res.json({
      status: true,
      message: "success",
      result,
    });
  };
  next();
});

require('./routes')(app);

// error handler
// require('./ErrorHandler')(app);

const PORT = 3457;
var server = http.createServer(app).listen(PORT, () => {
  console.info('[BEWE-AuthApiServer] Listening');
});

/* socket 붙이기 */
var socketIO = require('socket.io');
const socketEvents = require('./controllers/SocketCtrl');
const io = new socketIO(server);
socketEvents(io);

module.exports = app;
