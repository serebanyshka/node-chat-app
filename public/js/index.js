const socket = io();
const name = document.querySelector('#name');
const sendBtn = document.querySelector('#message-form');
const message = document.querySelector('#new-message');
const chat = document.querySelector('#chat');

init();
function init() {
  socket.on('connect', () => {
    console.log('Connected to the server');
    sendBtn.addEventListener('submit', sendMessage);
 });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', (message) => {
    chat.value += chat.value === ''? `${message.from}: ${message.text}`
      : `\n${message.from}: ${message.text}`;

    console.log(`from: ${message.from}`);
    console.log(`text: ${message.text}`);
    console.log(`date: ${message.createdAt}`);
  });
}

function sendMessage(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: name.value ,
    text: message.value
  });
}
