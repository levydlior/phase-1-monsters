let pagenumber = 1;
const monsterContainer = document.querySelector("#monster-container");

fetchMonsters();

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pagenumber}`)
    .then((response) => response.json())
    .then((monsters) => renderMonsters(monsters));
}

function renderMonsters(monsters) {
  monsters.forEach((monster) => {
    const monsterDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const monsterDescription = document.createElement("p");

    h2.textContent = "name :" + monster.name;
    h4.textContent = "age: " + monster.age;
    monsterDescription.textContent = "description: " + monster.description;

    monsterDiv.append(h2, h4, monsterDescription);
    monsterContainer.appendChild(monsterDiv);
  });
}

const back = document.querySelector("#back");
const forward = document.querySelector("#forward");

forward.addEventListener("click", () => {
  monsterContainer.innerHTML = "";
  pagenumber++;
  fetchMonsters();
});

back.addEventListener("click", () => {
  monsterContainer.innerHTML = "";
  pagenumber--;
  fetchMonsters();
});

const newMonsterForm = document.querySelector('#monsterForm')

newMonsterForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('prevenetd')
    const newFormData = new FormData(e.target)

    const monsterName = newFormData.get('name')
    const monsterAge = newFormData.get('age')
    const monsterDescription = newFormData.get('description')

    const newMonsterObject = {
        name: monsterName,
        age: monsterAge,
        description: monsterDescription
    }

    fetch(monsterURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonsterObject)
    }).then(response => response.json())
    //   .then(console.log)
})
