const socket = io();
const name = document.querySelector('#name');
const sendBtn = document.querySelector('#message-form');
const message = document.querySelector('#new-message');
const chat = document.querySelector('#chat');
const locationBtn = document.querySelector('#location-btn');

init();
function init() {
  sendBtn.addEventListener('submit', sendMessage);
  locationBtn.addEventListener('click', sendLocation);

  socket.on('connect', () => {
    console.log('Connected to the server');
 });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', message => {
    chat.insertAdjacentHTML('beforeend',`<p>${message.from}: ${message.text}</p>`);

    console.log(`from: ${message.from}`);
    console.log(`text: ${message.text}`);
    console.log(`date: ${message.createdAt}`);
  });

  socket.on('newLocationMessage', message => {
    chat.insertAdjacentHTML('beforeend', `<p>${message.from}: <a href="${message.url}" target="_blank">Google.maps</a></p>`);
  });
}

function sendLocation(e) {
  if(name.value === '') {
    return alert('Enter your name');
  }
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      from: name.value,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },error => {
    alert('Unable to fetch location');
  });
}

function sendMessage(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: name.value,
    text: message.value
  }, res => console.log(res));
}
