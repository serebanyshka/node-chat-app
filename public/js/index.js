(function() {
  const socket = io();
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
      chat.insertAdjacentHTML('beforeend', makeTemplateMsg(message));
      chat.scrollIntoView(false);
    });

    socket.on('newLocationMessage', message => {
      chat.insertAdjacentHTML('beforeend', makeTemplateLocMsg(message));
      chat.scrollIntoView(false);
    });
  }

  function sendLocation(e) {
    if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }
    locationBtn.disabled = true;
    locationBtn.innerHTML = 'Sending...';
    navigator.geolocation.getCurrentPosition(position => {
      locationBtn.disabled = false;
      locationBtn.innerHTML = 'Location';
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },error => {
      locationBtn.disabled = false;
      locationBtn.innerHTML = 'Location';
      alert('Unable to fetch location');
    });
  }

  function sendMessage(e) {
    e.preventDefault();
    if(message.value.trim() === '') {
      message.value = '';
      return;
    }
    socket.emit('createMessage', {
      text: message.value
    }, () =>{ //callback function to clear input after send message
      message.value = '';
    });
  }

  function formatTime(time) {
    return moment(time).format('h:mm a');
  }

  function makeTemplateMsg(message) {
    return `<p class="message">
        <div class="message__title">
          <h4>${message.from}</h4>
          <span>${formatTime(message.createdAt)}</span>
        </div>
        <div class="message__body">
          <p>${message.text}</p>
        </div>
      </p>`;
  }

  function makeTemplateLocMsg(message) {
    let newMessage = Object.assign({}, message);
    newMessage.text = `<a href="${message.url}" target="_blank">My current location</a>`;
    return makeTemplateMsg(newMessage);
  }
})();
