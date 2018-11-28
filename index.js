const monsterArea = document.getElementById('monster-container');
const createMonsterArea = document.getElementById('create-monster');
const fwdBtn = document.getElementById('forward');
const bkwdBtn = document.getElementById('back');

document.addEventListener("DOMContentLoaded", function () {
  loadAllMonsters();
  createMonsterForm ();
  const createMonsterBtn = document.querySelector('#create-btn');
  getForm().addEventListener('submit', addNewMonster);
  fwdBtn.addEventListener('click', getNextFifty);
  bkwdBtn.addEventListener('click', getPreviousFifty);

})

//////////// Display Monsters ///////////////////

function loadAllMonsters () {
  fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(res => res.json())
    .then(data => data.forEach(monster => {renderMonster(monster)}));
}

function renderMonster(monster) {
  let divElement = document.createElement('div');
  divElement.id = `monster-${monster.id}`;
  let nameElement = document.createElement('h2');
  nameElement.innerText = `${monster.name}`;
  let ageElement = document.createElement('li');
  ageElement.innerText = `Age: ${monster.age}`;
  let bioElement = document.createElement('li');
  bioElement.innerText = `Bio: ${monster.description}`;
  monsterArea.appendChild(divElement);
  divElement.appendChild(nameElement);
  nameElement.appendChild(ageElement);
  nameElement.appendChild(bioElement);
}


let page = 1;
function getNextFifty(event) {
  page++
  fetch ('http://localhost:3000/monsters/?_limit=50&_page=${page}')
    .then(res => res.json())
    .then(data => data.forEach(monster => {renderMonster(monster)}));
}

function getPreviousFifty(event) {
  page--
  fetch('http://localhost:3000/monsters/?_limit=50&page=${page}')
    .then(res => res.json())
    .then(data => data.forEach(monster => {renderMonster(monster)}));
}
///////////////// Create Form to Create New Monster ///////////

  function createMonsterForm () {
    let monsterForm = document.createElement('form');
    monsterForm.id = `monster-form`;
    let nameInput = document.createElement('input');
    nameInput.id = `name`;
    nameInput.placeholder = `name...`
    let ageInput = document.createElement('input');
    ageInput.id = `age`;
    ageInput.placeholder = `age...`
    let desInput = document.createElement('input');
    desInput.id = `description`;
    desInput.placeholder = `description...`
    let createBtn = document.createElement('button');
    createBtn.id = `create-btn`;
    createBtn.innerText = `Create`;
    createMonsterArea.appendChild(monsterForm);
    monsterForm.appendChild(nameInput);
    monsterForm.appendChild(ageInput);
    monsterForm.appendChild(desInput);
    monsterForm.appendChild(createBtn);
  }

  function getForm() {
    return document.querySelector('#monster-form');
  }

////// Post Request to add Monster to Database ///////////
function addNewMonster (e) {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let age = document.querySelector('#age').value;
  let description = document.querySelector('#description').value;
  postFetch(name, age, description);

}

function postFetch (name, age, description) {
  let data = {
    name: name,
    age: age,
    description: description
  }

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data.forEach(monster => renderMonster(data)));

  getForm().reset();
}
