const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message to everyone
    });

    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
});
  
  

server.listen(3000, () => {
  console.log('listening on *:3000');
});
