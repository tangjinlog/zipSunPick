/* Pick Animation */
const pickCon1 = document.querySelector('.pick-1-con');

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