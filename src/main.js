import HabitItem from './item.js';

const form = document.querySelector('form');
const resetBtn = document.querySelector('.resetBtn');
const habitList = document.querySelector('.habit-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target[0].value) {
    alert('습관을 입력해주세요!');
  } else if (e.target[0].value.trim().length > 12) {
    alert('글자수를 줄여주세요!');
  } else {
    const habitTitle = e.target[0].value.trim();
    const habitItem = new HabitItem(habitTitle);
    habitItem.makeItem();
    e.target[0].value = '';
  }
});

resetBtn.addEventListener('click', () => {
  return confirm('모든 습관들을 삭제하시겠습니까?') ? reset() : null;
});

function reset() {
  [...habitList.children].forEach((li) => li.remove());
}
