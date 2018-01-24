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
<<<<<<< HEAD
app.listen(PORT, () => {
  console.info(`[BEWE-AuthApiServer] Listening on Port ${PORT}`);
=======
var server = http.createServer(app).listen(PORT, () => {
>>>>>>> bea4c91e8f26bd80b87771a70903ab3a8f58fa57
  console.info(`[BEWE-PlatformApiServer] Listening on Port ${PORT}`);
});

/* socket 붙이기 */
const io = require('./controllers/SocketCtrl').initialize(server);

module.exports = app;
