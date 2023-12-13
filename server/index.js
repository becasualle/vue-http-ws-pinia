const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

app.use(cors());

const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('WEBSCOCKET CONNECTION SUCCESS'); //successfully logs

  socket.emit('randomDataSent', randomString());
  setInterval(() => {
    socket.emit('randomDataSent', randomString());
  }, 3 * 1000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNED');
});

function randomString() {
  const msg = 'data part:';
  const random = Math.floor(Math.random() * 100 + 1);
  return msg + random;
}
