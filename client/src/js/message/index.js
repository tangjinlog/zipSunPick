// import reply from './reply.js';

export default function message() {
  const socket = io.connect();
  const chatLog = document.querySelector('.chat-log');
  const chatBtn = document.getElementById('chat-btn');
  const message = document.getElementById('message');

  function createElem(data) {
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

    
    replyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const replyForm = document.createElement('form');
      const replyMsg = document.createElement('input');
      const replyFormBtn = document.createElement('input');
      
  
      replyForm.setAttribute('class', 'reply-form flex-r');
      replyMsg.setAttribute('id', 'reply-msg');
      replyMsg.setAttribute('type', 'text');
      replyFormBtn.setAttribute('id', 'reply-form-btn');
      replyFormBtn.setAttribute('type', 'submit');
      replyForm.append(replyMsg,replyFormBtn);
      console.log(replyForm)
      msgContentBox.append(replyForm);
      
      replyFormBtn.addEventListener('click', (e) => {

        socket.emit('SEND_REPLY', { 
          // userId: //mongodb에서 받아올 userid,
          // userImg
          // userLocation
          comment_author: 'tangjin',
          comment_text: replyMsg.value,
        })
      })

      replyMsg.value = '';
    })
  }
  /* preload */
  socket.on('preload', (data) => {
    createElem(data);
    // reply();
  })

  socket.on('SEND_MESSAGE', (data) => {
    createElem(data);
    // reply();
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

  

  /* reply */
    //동적 추가 후 생성된 replyBtn
    // replyBtn = document.querySelector('.reply-btn');
  



}