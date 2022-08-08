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