const express = require('express');
const routes = require('./routes/route')
const cors = require('cors');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chatComponent = require('./components/chatbox/chatComponent');
const { mongoConnect, mongoDisconnect} = require('./components/mongo/db_connect');
require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoConnect();
const io = socketIO(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

chatComponent(io);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
