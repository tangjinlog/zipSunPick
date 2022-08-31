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
    chatLog.setAttribute('aria-expanded', false);
    replyBtn.innerText = '답글쓰기';

    userId.innerText = '';
    // userLocation.innerText = data.location;
    msgContent.innerText = data.message;
      
    chatLog.append(msgCon);
    msgCon.append(msgImgBox, msgContentBox);
    msgImgBox.append(userImg);
    msgContentBox.append(userId, userLocation, msgContent, replyBtn);

    chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;

    // console.log(data.comment);
    /* reply form add */
    // if( data.comment) {
    // console.log(data.id);
      
    // }
    


    replyBtn.addEventListener('click', (e) => {
      if(document.querySelector('.reply-form') == null || chatLog.getAttribute('aria-expanded') == 'false') {
        chatLog.setAttribute('aria-expanded', true);

        const replyForm = document.createElement('form');
        const replyMsg = document.createElement('input');
        const replyFormBtn = document.createElement('input');
    
        replyForm.setAttribute('class', 'reply-form flex-r');
        replyMsg.setAttribute('id', 'reply-msg');
        replyMsg.setAttribute('type', 'text');
        replyFormBtn.setAttribute('id', 'reply-form-btn');
        replyFormBtn.setAttribute('type', 'submit');
        replyFormBtn.setAttribute('value', '등록');
        replyForm.append(replyMsg,replyFormBtn);
        msgContentBox.append(replyForm);
        
        replyFormBtn.addEventListener('click', (e) => {
          e.preventDefault();
          chatLog.setAttribute('aria-expanded', false);
          
          const replyCon = document.createElement('div');
          const replyImgBox = document.createElement('div')
          const replyUserImg = document.createElement('span')
          const replyContentBox = document.createElement('div')
          const replyUserId = document.createElement('span')
          const replyUserLocation = document.createElement('span')
          const replyContent = document.createElement('p')
          
          //클릭이 일어난 부모 node 찾기
          const msgContentBox = e.currentTarget.parentNode.parentNode;
          
          replyCon.setAttribute('class', 'reply msg-con flex-r');
          replyImgBox.setAttribute('class', 'msg-img-box');
          replyUserImg.setAttribute('class', 'user-img');
          replyContentBox.setAttribute('class', 'msg-content-box');
          replyUserId.setAttribute('class', 'user-id');
          replyUserLocation.setAttribute('class', 'user-location');
          replyContent.setAttribute('class', 'msg-content');
          
          replyContent.innerText = data.comment_text
          
          replyForm.remove();
          msgContentBox.append(replyCon);
          replyCon.append(replyImgBox, replyContentBox);
          replyImgBox.append(replyUserImg);
          replyContentBox.append(replyUserId, replyUserLocation, replyContent);
  
          socket.emit('SEND_REPLY', { 
            // userId: //mongodb에서 받아올 userid,
            // userImg
            // userLocation
            comment_author: 'tangjin', 
            comment_text: replyMsg.value,
          })
        })
  
        replyMsg.value = '';
      }
    })
  }
  /**
   * 각각의 _id값이 있다. data.save 시.
   * 
   */
  function createReply(data,e) {
    
  }

  /* preload */
  socket.on('preload', (data) => {
    createElem(data);
    if(data.comment_text) {
      createReply(data);
    }
  })

  socket.on('SEND_MESSAGE', (data) => {
    createElem(data);
    // reply();
  })

  socket.on('SEND_REPLY', (data) => {
    // createElem(data);
    
    createReply(data);

    
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