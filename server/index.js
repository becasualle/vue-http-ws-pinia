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
  console.log(socket);
});

server.listen(3001, () => {
  console.log('SERVER RUNNED');
});