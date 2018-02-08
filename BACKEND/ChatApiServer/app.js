const path = require('path')
    ,cors = require('cors')
    ,http = require('http')
    ,express = require('express')
    ,bodyParser = require('body-parser')
    ,room = require('./socket/room')
    ;

const redis = require('redis');

const pub = redis.createClient(6379, '52.78.25.56');
const sub = redis.createClient(6379, '52.78.25.56');
  
sub.subscribe('sub');
sub.on('subscribe',function (channel, count) {
  console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});
// setup server
const app = express();
const server = http.createServer(app);
const io = require('./socket/socketService')(server, pub, sub);

app.use('/', express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// require('./socket/messageSocket').initialize();

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

// Start listening
server.listen(process.env.PORT || '4000');
console.log(`Started on port 4000`);

module.exports = app;