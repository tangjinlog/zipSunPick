export default function reply() {
  // const socket = io.connect();
  /** 
   * 답글쓰기 버튼 클릭시 input창 활성화
   * 답글 form(영역차지)추가
   * 취소, 등록버튼
   * 등록시 append
   * 취소시 form 삭제 parent.removechildNode
   */

  const replyForm = document.createElement('form');
  const replyMsg = document.createElement('input');
  const replyFormBtn = document.createElement('input');
  //동적 추가 후 생성된 replyBtn
  const replyBtn = document.querySelectorAll('.reply-btn');
  replyBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      socket.emit('SEND_REPLY', { 
        // userId: //mongodb에서 받아올 userid,
        // userImg
        // userLocation
        comment_author: 'tangjin',
        comment_text: replyMsg.value,
      })

      replyForm.setAttribute('class', 'reply-form flex-r');
      replyMsg.setAttribute('id', 'reply-msg');
      replyFormBtn.setAttribute('id', 'reply-form-btn');
    
      replyForm.append(replyMsg,replyFormBtn);
      replyForm.parentNode.apeend(replyForm);
      
      replyMsg.value = '';
    })
  })
  
  

  

}