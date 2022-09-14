(() => {
  const signInCon = document.querySelector('.sign-in-con');
  const signUpCon = document.querySelector('.sign-up-con');
  const signInSelectBtn = document.querySelector('#sign-in-select-btn');
  const signUpSelectBtn = document.querySelector('#sign-up-select-btn');
  const signOutBtn = document.querySelector('#sign-out-btn');
  
  /* 로그인 전 */
  if(!signOutBtn) {
    signUpSelectBtn.addEventListener('click', ()=> {
      signInCon.classList.add('d-none');
      signUpCon.classList.remove('d-none');
      signUpCon.classList.add('flex-c');
    })
    
    signInSelectBtn.addEventListener('click', ()=> {
      signUpCon.classList.add('d-none');
      signInCon.classList.remove('d-none');
      signInCon.classList.add('flex-c');
    })
    
    const signUpBtn = document.querySelector('#sign-up-btn');
    signUpBtn.addEventListener('click', (e)=> {
      SignUp();
      e.preventDefault();
    })
    
    const signInBtn = document.querySelector('#sign-in-btn');
    signInBtn.addEventListener('click', (e)=> {
      SignIn();
      e.preventDefault();
    })
  }
  
  /* 로그인 후 */
  if(signOutBtn) {
    signOutBtn.addEventListener('click', ()=> {
      $.ajax({
        type: 'get',
        url: 'http://localhost:3001/logOut',
        data: {},
        dataType: 'text',
        success: function(res) {
          location.reload();
        },
        error: function() {
          console.log('에러발생');
        }
      })
    })
  }



  function SignUp() {
    
    const id = document.querySelector('#sign-up-id').value;
    const pw = document.querySelector('#sign-up-pw').value;
    const pwc = document.querySelector('#sign-up-pwc').value;
    //값을 갱신하지 않고 새로 찾아 값 변경
    document.querySelector('#sign-up-id').value = '';
    document.querySelector('#sign-up-pw').value = '';
    document.querySelector('#sign-up-pwc').value = '';
    
    /* ajax */
    $.ajax({
      type: "post",
      url: 'http://localhost:3001/login/:signUpId/:signUpPw/:signUpPwc',
      data: {id:id, pw:pw, pwc: pwc},
      dataType: 'text',
      success: function(res) {
        window.alert(res);
      },
      error: function() {
        window.alert('에러발생');
      }
    })
  }

  function SignIn() {
    const signInId = document.querySelector('#sign-in-id').value;
    const signInPw = document.querySelector('#sign-in-pw').value;

    document.querySelector('#sign-in-id').value = '';
    document.querySelector('#sign-in-pw').value = '';

    $.ajax({
      type: 'post',
      url: 'http://localhost:3001/login/:signInId/:signInPw',
      data: {id: signInId, pw: signInPw},
      dataType: 'text',
      success: function(res) {
        window.alert(res);
        location.reload();
      },
      error: function() {
        window.alert('에러발생');
      }
    })
  }

})();


/* 구현예정 */
/* 
item-list-con 의 width 값
width : 100% + (100% / item 개수)%
마지막 아이템에서 오른쪽화살표 클릭시 맨 처음 아이템으로 이동
반대도 마찬가지

js - mediaquery


알아낸 사실 셀렉터 포함 숫자 끼리만 - 계산 적용,
변수포함한 숫자는 - 계산 안됨 문자열로만 붙여짐
*/