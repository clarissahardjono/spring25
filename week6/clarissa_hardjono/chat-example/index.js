const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let users = {}; 

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('set nickname', (nickname) => {
        users[socket.id] = nickname;
        console.log(`${nickname} has joined the chat.`);
        io.emit('chat message', { nickname: 'System', message: `${nickname} has joined the chat!` });
    });

    socket.on('chat message', (msg) => {
        console.log(`Message from ${msg.nickname}: ${msg.message}`);
        io.emit('chat message', msg);
    });

    socket.on('typing', (nickname) => {
        socket.broadcast.emit('typing', nickname);
    });

    socket.on('disconnect', () => {
        let nickname = users[socket.id] || "Anonymous";
        console.log(`${nickname} disconnected.`);
        delete users[socket.id]; // Remove user from the list
        io.emit('chat message', { nickname: 'System', message: `${nickname} has left the chat.` });
    });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
