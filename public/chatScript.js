const socket = io('/chat'); 

const name = prompt('What is your name?');

socket.emit('join-room', 'common-room');

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

document.getElementById('send-container').addEventListener('submit', e => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', { room: 'common-room', message: message, name: name });
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  document.getElementById('message-container').appendChild(messageElement);
}
