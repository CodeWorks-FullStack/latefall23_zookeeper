console.log("Time to zoo!")

const animals = [
  {
    name: 'Gary',
    picture: '🦍',
    hunger: 100,
    status: '😁'
  },
  {
    name: 'Larry',
    picture: '🦒',
    hunger: 100,
    status: '😁'
  },
  {
    name: 'Terry',
    picture: '🐅',
    hunger: 50,
    status: '😐'
  },
]

function hungerHappens(){
  animals.forEach(animal =>{
    animal.hunger -= 5
    if(animal.hunger <= 0) animal.hunger = 0 // when you if can be completed in one line, it doesn't need {}
  })
  // console.log('🍽️', animals)
  updateAnimals()
}
// Runs the func provided with a delay of milliseconds between
//We need to pass INSTRUCTIONS to the interval so the interval can call it on it's own
let hungerInterval = setInterval(hungerHappens, 3000)
// clearInterval(hungerInterval) this is how we could stop that interval once it is no longer needed


function updateAnimals(){
  animals.forEach(animal =>{
    let enclosureElm = document.getElementById(animal.name)
    // console.log('🥡',enclosureElm);
    let statsElm = enclosureElm.querySelector('.stats')
    // console.log('📈', statsElm);
    // @ts-ignore query selector is not specific about the element that is coming back so it doesn't know it will be a element with inner text
    statsElm.innerText = `${animal.name} | ${animal.hunger} | ${animal.status}`
  })
}

function feedAnimal(animalName){
console.log('🍔', animalName);
let clickedAnimal = animals.find(animal => animal.name == animalName)
console.log('🍽️', clickedAnimal);
clickedAnimal.hunger += 2
if(clickedAnimal.hunger >= 100) clickedAnimal.hunger = 100
updateAnimals()
}
