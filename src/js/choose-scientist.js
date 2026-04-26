const chooseScientistRoot = document.querySelector('#choose-scientist-root');
// DATA
const scientists = [
  {
    name: 'Albert',
    surname: 'Einstein',
    born: 1879,
    dead: 1955,
    id: 1,
  },
  {
    name: 'Isaac',
    surname: 'Newton',
    born: 1643,
    dead: 1727,
    id: 2,
  },
  {
    name: 'Galileo',
    surname: 'Galilei',
    born: 1564,
    dead: 1642,
    id: 3,
  },
  {
    name: 'Marie',
    surname: 'Curie',
    born: 1867,
    dead: 1934,
    id: 4,
  },
  {
    name: 'Johannes',
    surname: 'Kepler',
    born: 1571,
    dead: 1630,
    id: 5,
  },
  {
    name: 'Nicolaus',
    surname: 'Copernicus',
    born: 1473,
    dead: 1543,
    id: 6,
  },
  {
    name: 'Max',
    surname: 'Planck',
    born: 1858,
    dead: 1947,
    id: 7,
  },
  {
    name: 'Katherine',
    surname: 'Blodgett',
    born: 1898,
    dead: 1979,
    id: 8,
  },
  {
    name: 'Ada',
    surname: 'Lovelace',
    born: 1815,
    dead: 1852,
    id: 9,
  },
  {
    name: 'Sarah E.',
    surname: 'Goode',
    born: 1855,
    dead: 1905,
    id: 10,
  },
  {
    name: 'Lise',
    surname: 'Meitner',
    born: 1878,
    dead: 1968,
    id: 11,
  },
  {
    name: 'Hanna',
    surname: 'Hammarström',
    born: 1829,
    dead: 1909,
    id: 12,
  },
];

const textBtn = [
  'Які вчені народилися в 19 ст.',
  'Знайти рік народження Albert Einshtein',
  'Відсортувати вчених за алфавітом',
  'Знайти вчених, прізвища яких починаються на на літеру “С” ',
  'Відсортувати вчених за кількістю прожитих років',
  'Видалити всіх вчених, ім’я яких починається на “А”',
  'Знайти вченого, який народився найпізніше',
  'Знайти вченого, який прожив найдовше і вченого, який прожив найменше',
  '1.Знайти вчених, в яких співпадають перші літери імені і прізвища',
];

// FUNCTION
function createEl(tag, className, text, numberOftags = 1) {
  const elements = [];
  for (let i = 0; i < numberOftags; i++) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    elements.push(node);
  }
  return numberOftags === 1 ? elements[0] : elements;
}
function distributeOfEl(distributeArr, recipientArr) {
  const result = [];
  for (let i = 0; i < distributeArr.length; i++) {
    recipientArr[i].append(distributeArr[i]);
    result.push(recipientArr[i]);
  }
  return result;
}
function addText(arrayEl, arrayText, methodNumber = 1) {
  switch (methodNumber) {
    case 1:
      for (let i = 0; i < arrayEl.length; i++) {
        arrayEl[i].textContent = arrayText[i];
      }
      break;

    case 2:
      for (let i = 0; i < arrayText.length; i++) {
        arrayEl[i].textContent = `${arrayText[i].name} ${arrayText[i].surname}
    ${arrayText[i].born}-${arrayText[i].dead}`;
      }
      break;
  }
}
function updateData(data) {
  scientistList.innerHTML = '';

  const items = createEl('li', 'scientist-item', undefined, 12);
  const text = createEl('p', 'scientist-text', undefined, data.length);
  switch (text.length) {
    case 1:
      const arr = [];
      arr.push(text);
      addText(arr, data, 2);
      items.append(arr[0]);

    default:
      addText(text, data, 2);
      distributeOfEl(text, items);
  }
  scientistList.append(...items);
}
// HTML
const scientistTitle = createEl('h2', 'scientist-title', 'Обери вченого/их');
const scientistList = createEl('ul', 'scientist-list');
const scientistText = createEl('p', 'scientist-text', undefined, 12);
const scientistTextItem = createEl('li', 'scientist-item', undefined, 12);
const scientistBtnList = createEl('ul', 'scientist-btn-list');
const scientistBtn = createEl('button', 'scientist-btn', undefined, 9);
const scientistBtnItem = createEl('li', 'scientist-btn-item', undefined, 9);
chooseScientistRoot.append(scientistTitle, scientistList, scientistBtnList);

addText(scientistText, scientists, 2);
addText(scientistBtn, textBtn, 1);

const scientistItems = distributeOfEl(scientistText, scientistTextItem);
scientistList.append(...scientistItems);

const scientistItemBtn = distributeOfEl(scientistBtn, scientistBtnItem);

const ulL = createEl('ul', 'help-ul-l');
const btnArr1 = scientistItemBtn.splice(0, 4);
const ulR = createEl('ul', 'help-ul-r');
const btnArr2 = scientistItemBtn.splice(0, 4);
console.log(btnArr1);

scientistBtnList.append(ulL, ulR, ...scientistItemBtn);
ulL.append(...btnArr1);
ulR.append(...btnArr2);

// LOGIK
const events = {
  0: () => {
    const filtered = scientists.filter(s => s.born >= 1801 && s.born <= 1900);
    console.log(filtered);
    updateData(filtered);
  },
  1: () => {
    const filtered = scientists.filter(s => s.surname === 'Einstein');
    console.log(filtered);
    updateData(filtered); // !!!
  },
  2: () => {
    const sorted = [...scientists].sort((a, b) =>
      a.surname.localeCompare(b.surname)
    );
    updateData(sorted);
  },
  3: () => {
    const filtered = scientists.filter(s => s.surname.startsWith('C'));
    updateData(filtered);
  },
  4: () => {
    const sorted = [...scientists].sort(
      (a, b) => (a.dead - a.born) - (b.dead - b.born)
    );
    updateData(sorted);
  },
  5: () => {
    const filtered = scientists.filter(s => !s.name.startsWith('A'));
    updateData(filtered);
  },
  6: () => {
    const filtered = scientists.reduce((max, s) =>
      s.born > max.born ? s : max
    );
    updateData(filtered);
  },
  7: () => {
    const sorted = [...scientists].sort(
      (a, b) => (a.dead - a.born) - (b.dead - b.born)
    );
    updateData([sorted[0], sorted.at(-1)]);
  },
  8: () => {
    const filtered = scientists.filter(s => s.name[0] === s.surname[0]);
    updateData(filtered);
  },
};
const btnWithEvents = scientistBtn.forEach((btn, i) => {
  btn.addEventListener('click', events[i]);
});
