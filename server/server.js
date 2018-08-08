const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = Object.create(Users);
users.init();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('createMessage', (message, callback) => {
    //event for everybody
    io.emit('newMessage', generateMessage('User', message.text));
    callback(); //to send result back
    // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required!');
    }
    socket.join(params.room);
    users.removeUser(socket.id); //remove from other room, before add to new room
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin',`Welcome to ${params.room} room`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage',
      generateLocationMessage('User', message.latitude, message.longitude));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left.`));
    }
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Start node chat at port ${port}`);
});
