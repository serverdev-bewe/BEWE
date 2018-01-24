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

//error handler
require('./ErrorHandler')(app);

const PORT = 3457;
var server = http.createServer(app).listen(PORT, () => {
  console.info(`[BEWE-PlatformApiServer] Listening on Port ${PORT}`);
});
//adfasdf

/* socket 붙이기 */
const io = require('./controllers/SocketCtrl').initialize(server);

module.exports = app;
