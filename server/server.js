const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    //event for everybody
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage',
      generateLocationMessage(message.from, message.latitude, message.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Start node chat at port ${port}`);
});
