
let pageNumber = 1
const monstersContainer = document.querySelector('#monster-container')

const forward = document.querySelector('#forward')
const backward = document.querySelector('#back')

forward.addEventListener('click', () => {
    pageNumber ++
    monstersContainer.innerHTML= " "
    fetchMonsters(pageNumber)
})

backward.addEventListener('click', () => {
    if(pageNumber <= 1){
    alert("can't go back anymore!")
}else {
    pageNumber --
    monstersContainer.innerHTML= " "
    fetchMonsters(pageNumber)
}
})

fetchMonsters()
function fetchMonsters(pageNumber){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsters => renderMonstersToPage(monsters) )
}

    function  renderMonstersToPage(monsters){
        monsters.forEach(monster => {
            const monsterCrad = document.createElement('div')
            const h2 = document.createElement('h2')
            const age = document.createElement('h4')
            const description = document.createElement('p')
        
            h2.textContent = monster.name
            age.textContent = "Age: " + monster.age
            description.textContent = monster.description
            monsterCrad.id = monster.id

            monsterCrad.append(h2, age, description)
            monstersContainer.appendChild(monsterCrad)
        })
    }

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

