export default function message() {
  const socket = io.connect();
  const chatLog = document.querySelector('.chat-log');
  const chatBtn = document.getElementById('chat-btn');
  const message = document.getElementById('message');
  console.log(message.value);


  /* preload */
  socket.on('preload', (data) => {
    const msgCon = document.createElement('div');
    const msgImgBox = document.createElement('div')
    const userImg = document.createElement('span')
    const msgContentBox = document.createElement('div')
    const userId = document.createElement('span')
    const userLocation = document.createElement('span')
    const msgContent = document.createElement('p')
    const replyBtn = document.createElement('button')
    msgCon.setAttribute('class', 'msg-con flex-r');
    msgImgBox.setAttribute('class', 'msg-img-box');
    userImg.setAttribute('class', 'user-img');
    msgContentBox.setAttribute('class', 'msg-content-box');
    userId.setAttribute('class', 'user-id');
    userLocation.setAttribute('class', 'user-location');
    msgContent.setAttribute('class', 'msg-content');
    replyBtn.setAttribute('class', 'reply-btn');
    replyBtn.innerText = '답글쓰기';

    userId.innerText = '';
    // userLocation.innerText = data.location;
    msgContent.innerText = data.message;
      
    chatLog.append(msgCon);
    msgCon.append(msgImgBox, msgContentBox);
    msgImgBox.append(userImg);
    msgContentBox.append(userId, userLocation, msgContent, replyBtn);

    chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
    console.log(msgCon.scrollTop, chatLog.scrollHeight)
  })

  socket.on('SEND_MESSAGE', (data) => {
    const msgCon = document.createElement('div');
    const msgImgBox = document.createElement('div')
    const userImg = document.createElement('span')
    const msgContentBox = document.createElement('div')
    const userId = document.createElement('span')
    const userLocation = document.createElement('span')
    const msgContent = document.createElement('p')
    const replyBtn = document.createElement('button')
    msgCon.setAttribute('class', 'msg-con flex-r');
    msgImgBox.setAttribute('class', 'msg-img-box');
    userImg.setAttribute('class', 'user-img');
    msgContentBox.setAttribute('class', 'msg-content-box');
    userId.setAttribute('class', 'user-id');
    userLocation.setAttribute('class', 'user-location');
    msgContent.setAttribute('class', 'msg-content');
    replyBtn.setAttribute('class', 'reply-btn');
    replyBtn.innerText = '답글쓰기';

    userId.innerText = '';
    // userLocation.innerText = data.location;
    msgContent.innerText = data.message;
      
    chatLog.append(msgCon);
    msgCon.append(msgImgBox, msgContentBox);
    msgImgBox.append(userImg);
    msgContentBox.append(userId, userLocation, msgContent, replyBtn);

    chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
  })

  chatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('SEND_MESSAGE', { 
      // userId: //mongodb에서 받아올 userid,
      // userImg
      // userLocation
      userId: '',
      message: message.value,
    })
    message.value = '';
  })

  



}