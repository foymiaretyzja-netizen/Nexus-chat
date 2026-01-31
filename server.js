const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let chatHistory = [];

// Data wipe every 15 minutes
setInterval(() => {
    chatHistory = [];
    io.emit('data_wipe', { message: "Nexus has been reset." });
    console.log("Global data wiped.");
}, 15 * 60 * 1000);

io.on('connection', (socket) => {
    console.log('User joined:', socket.id);

    socket.on('send_message', (data) => {
        // Broadcast message to everyone
        io.emit('receive_message', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Nexus running on port ${PORT}`));
