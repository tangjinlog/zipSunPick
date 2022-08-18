export default function message() {
  const socket = io.connect();
  const chatBtn = document.getElementById('chat-btn');
  const message = document.getElementById('message');
  chatBtn.addEventListener('click', () => {
    socket.emit('SEND_MESSAGE', { userId: userId, message: message })
  })



}