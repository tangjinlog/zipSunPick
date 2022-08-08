(() => {
  /* sns 공유 버튼 */
  function sns_send() {
    const twitterBtn = document.querySelector('.twitter-btn');
    const faceBookBtn = document.querySelector('.facebook-btn');
    // const twitterBtn = document.querySelector('.twitter-btn');
    const thisUrl = document.URL;
    const snsTitle = '집선픽 2022';
    twitterBtn.addEventListener('click', ()=> {
      const url = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(snsTitle);
      window.open(url, "tweetPop", "width=486, height=286, scrollBars=yes");
    })
    faceBookBtn.addEventListener('click', ()=> {
      const url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(thisUrl);
      window.open(url, "tweetPop", "width=486, height=286, scrollBars=yes");
    })
  }

  /* Pick Animation */
  const pickCon1 = document.querySelector('.pick-1-con');
  const pickCon2 = document.querySelector('.pick-2-con');
  const pickCon3 = document.querySelector('.pick-3-con');

  let pickTiming = { duration: 200, iterations: 1, fill: 'forwards' };

  const pickBox1 = document.querySelector('.pick-1-box');
  pickBox1.innerHTML = ''
  + '<span>에어프라이어</span>'
  + '<span>김치냉장고</span>'
  + '<span>LG스마트TV</span>'
  + '<span>삼성비스포크</span>'
  + '<span>휴지</span>'
  + '<span>에어프라이어</span>'
  + '<span>김치냉장고</span>'
  + '<span>LG스마트TV</span>'
  + '<span>삼성비스포크</span>'
  + '<span>휴지</span>'
  + '<span>에어프라이어</span>'
  + '<span>김치냉장고</span>'
  + '<span>LG스마트TV</span>'
  + '<span>삼성비스포크</span>'
  + '<span>휴지</span>'
  + '<span>에어프라이어</span>'
  + '<span>김치냉장고</span>'
  + '<span>LG스마트TV</span>'
  + '<span>삼성비스포크</span>'
  + '<span>휴지</span>';

  pickCon1.addEventListener('animationend', () => {
    const pickScale = [ {transform: 'scale(1)'}, {transform: 'scale(1.2)'} ];
    pickCon1.animate(pickScale, pickTiming);
  })

  // pickCon2.addEventListener('animationstart', () => {
  //   const pickConMove = [ {transform: 'translateY(0)'}, {transform: 'translateY(1vh)'} ];
  //   pickCon2.animate(pickConMove, pickTiming);
  // })
  



  // const slowAni = [ {top: `-400%`} , {top: 0} ];
  // const slowAni2 = [ {top: `-400%`} , {top: 0} ];
  // const slowTiming = {
  //   duration: 600,
  //   iterations: 5,
  //   // easing: 'linear',
  //   fill: 'forwards',
  // }
  // const slowTiming2 = {
  //   duration: 1500,
  //   iterations: 2,
  //   delay: 500,
  //   // easing: 'eas',
  //   fill: 'forwards',
  // }
  // // pickBox.addEventListener('animationend', () => {
  // //   // pickBox.animate(slowAni, slowTiming);
  // //   pickBox.animate(slowAni2, slowTiming2);

  // // })




  sns_send();
})();