/* Variables used */
const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];
const listItems = [];
let dragStartIndex;

/* DOM Elements */
const draggable_list = document.getElementById('draggable-list');
const checkOrderBtn = document.getElementById('check');

/* Functions */
function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable');
  const toItem = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(toItem);
  listItems[toIndex].appendChild(fromItem);
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function clearValidationUpdates() {
  listItems.forEach((item) => {
    item.classList.remove('right');
    item.classList.remove('wrong');
  });
}

function validateOrderAndUpdateDisplay() {
  clearValidationUpdates();
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.person-name').textContent;
    if (personName === richestPeople[index]) {
      item.classList.add('right');
    } else {
      item.classList.add('wrong');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });

  checkOrderBtn.addEventListener('click', validateOrderAndUpdateDisplay);
}

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

createList();
