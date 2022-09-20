import message from './message/index.js';

/* chat-log padding bottom */
const chatWrap = document.querySelector('.chat-wrap');
console.log(chatWrap);
const formBottomPadding = document.querySelector('.chat-form').getBoundingClientRect().height;
chatWrap.style.paddingBottom = `${formBottomPadding}px`;

message();         