var path = require('path')
    ,cors = require('cors')
    ,http = require('http')
    ,express = require('express')
    ,bodyParser = require('body-parser')
    ,room = require('./socket/room')
    ;

// setup server
const app = express();
const server = http.createServer(app);
var io = require('./socket/socketService')(server);

app.use('/', express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.get('/api/room/:seq', room.index);

// Render a API index page
app.get('/', (req, res) => {
  console.log('hi!');
});

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