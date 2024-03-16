// api/express-server.js

const express = require('express');
const socket = require('socket.io');

const app = express();
const server = require('http').Server(app);
const io = socket(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Socket connected!');
  // Socket.IO event handlers
});

module.exports = app;
