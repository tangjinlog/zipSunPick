/* Pick Animation */
const pickCon1 = document.querySelector('.pick-1-con');
const pickCon2 = document.querySelector('.pick-2-con');
const pickCon3 = document.querySelector('.pick-3-con');
let pickTiming = { duration: 200, iterations: 1, fill: 'forwards' };
let pickTiming2 = { duration: 800, iterations: 1, fill: 'forwards', delay: 400 };
let pickTiming3 = { duration: 800, iterations: 1, fill: 'forwards', delay: 600 };

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
  const pickTranslate1 = [ {transform: 'translateY(4vh)', opacity: 0}, {transform: 'translateY(0)', opacity: 1} ];
  const pickTranslate2 = [ {transform: 'translateY(4vh)', opacity: 0}, {transform: 'translateY(0)', opacity: 1} ];
  pickCon2.animate(pickTranslate1, pickTiming2);
  pickCon3.animate(pickTranslate2, pickTiming3);
})

function itemArrow() {
    const itemListCon = document.querySelector('.item-list-con');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    let itemList = document.getElementsByClassName('item-list');
    let index = 0;

    leftArrow.addEventListener('click', () => {
      if( index == 0 ) {
        index = itemList.length - 3; // 1
      } else {
        index--;
      } 
      itemListCon.style.marginLeft = '-' + index * 33.33 + '%';
    })

    rightArrow.addEventListener('click', () => {
      if( index == itemList.length - 3 ) {
        index = 0; 
      } else {
        index++;
      } 
      itemListCon.style.marginLeft =  '-'+ index * 33.33 + '%';
    })
  }
  itemArrow();