const headerCountArr = [];

export default class HabitItem {
  constructor(title) {
    this.count = 0;
    this.title = title;
    this.ul = document.querySelector('.habit-list');
    this.headerCount = document.querySelector('.header-count');
  }

  makeItem() {
    const li = document.createElement('li');
    const liId = uuidv4();
    const countId = uuidv4();
    li.classList.add('habit-item');
    li.setAttribute('id', liId);
    li.innerHTML = `
      <div class="habit-item__title">
          <h2>${this.title}</h2>
          <span id=${countId} class="habit-item__count">${this.count}</span>
      </div>
      <div class="habit-item__operator">
        <i class="fas fa-plus"></i>
        <i class="fas fa-minus"></i>
        <i class="fas fa-trash"></i>
      </div>
      `;
    this.ul.appendChild(li);

    this.itemCount = document.getElementById(`${countId}`);
    this.item = document.getElementById(`${liId}`);

    this.item.addEventListener('click', (e) => {
      if (e.target.classList.contains('fas')) {
        e.target.classList.contains('fa-plus')
          ? this.plus()
          : e.target.classList.contains('fa-minus')
          ? this.minus()
          : this.deleteItem();
      }
    });
  }

  plus() {
    this.count++;
    this.itemCount.textContent = this.count;

    if (headerCountArr.includes(this.item.getAttribute('id'))) {
      return;
    } else {
      headerCountArr.push(this.item.getAttribute('id'));
      this.headerCount.textContent = headerCountArr.length;
    }
  }
  minus() {
    if (this.count === 0) {
      this.count = 0;
    } else {
      this.count--;
      if (this.count === 0) {
        const i = headerCountArr.findIndex((id) => id === this.item.getAttribute('id'));
        headerCountArr.splice(i, 1);
        this.headerCount.textContent = headerCountArr.length;
      }
    }
    this.itemCount.textContent = this.count;
  }
  deleteItem() {
    this.item.remove();
  }
}

// 목표마다 개별 id를 부여하기 위해서 uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
