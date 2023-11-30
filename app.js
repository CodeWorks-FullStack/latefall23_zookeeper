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
    hunger: 10,
    status: '😐'
  },
  {
    name: 'Perry',
    picture: '🦜',
    hunger: 100,
    status: '😐'
  },
  {
    name: 'Barry',
    picture: '🐝',
    hunger: 100,
    status: '😐'
  },
  {
    name: 'Jerry',
    picture: '🦛',
    hunger: 100,
    status: '😐'
  },
]

let money = 0
let gameOver = false

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
let hungerInterval = setInterval(hungerHappens, 200)
// clearInterval(hungerInterval) this is how we could stop that interval once it is no longer needed


function updateAnimals(){
  updateAnimalStatuses()
  animals.forEach(animal =>{
    let enclosureElm = document.getElementById(animal.name)
    // console.log('🥡',enclosureElm);
    /** @type {HTMLDivElement} functionality wise, this does nothing*/
    let statsElm = enclosureElm.querySelector('.stats')
    // console.log('📈', statsElm);
    //  query selector is not specific about the element that is coming back so it doesn't know it will be a element with inner text
    statsElm.innerText = `${animal.name} | ${animal.hunger} | ${animal.status}`
  })
}

function updateAnimalStatuses(){
  animals.forEach(animal => {
    if(animal.hunger >= 60){
      animal.status = '😁'
    } else if (animal.hunger >= 20){
      animal.status = '😐'
    } else if ( animal.hunger > 0){
      animal.status = '😖'
    } else {
      killAnimal(animal)
      animal.status = '☠️'
      checkForGameOver()
  }
  })
}

function feedAnimal(animalName){
console.log('🍔', animalName);
let clickedAnimal = animals.find(animal => animal.name == animalName)
console.log('🍽️', clickedAnimal);
if(clickedAnimal.status != '☠️'){
  clickedAnimal.hunger += 2
  if(clickedAnimal.hunger >= 100) clickedAnimal.hunger = 100
  updateAnimals()
}
}

function killAnimal(animal){
  if(animal.status != '☠️'){
    let enclosureElm = document.getElementById(animal.name)
    /** @type {HTMLMarqueeElement} */
    let marquee1 = enclosureElm.querySelector('marquee')
    /** @type {HTMLMarqueeElement} */
    let marquee2 = enclosureElm.querySelector('marquee marquee')
    let animalElm = enclosureElm.querySelector('.animal')
    animalElm.classList.add('dead')
    marquee1.stop()
    marquee2.stop()
    
  }
}

function getPaid(){
  let paycheck = 0
  animals.forEach(animal => {
    switch(animal.status){
      case "😁":
        paycheck += 50
        break
      case "😐": 
        paycheck += 25
        break
      case "😖":
        paycheck += 10
        break
    }
  })
  money += paycheck
  console.log('💰', paycheck, money);
  drawMoney()
  drawPaycheck(paycheck)

  if(paycheck){
    playCashSound()
  }
}

function drawMoney(){
  let moneyElm = document.getElementById('money')
  moneyElm.innerText = money.toString()
}

function drawPaycheck(paycheck){
  let paycheckElm = document.getElementById('paycheck')
  paycheckElm.innerText = paycheck.toString()
}

setInterval(getPaid, 5000)


function playCashSound(){
  /** @type {HTMLAudioElement} */
  let audioElm = document.querySelector('audio#cash-sound')
  audioElm.play()
}

function checkForGameOver(){
  let deadAnimals = animals.filter(animal => animal.status == '☠️')
  if(deadAnimals.length == animals.length && gameOver == false){ // have all animals died, and the game is still running?
    gameOver = true
    console.log('All your animals are dead. You will never financially recover');
    setTimeout(()=>{ // setTimeout also takes in a function and time, but doesn't call the function multiple times, it calls it just once, with a delay of milliseconds
      window.alert('All your animals are dead. You will never financially recover')
      checkForHighScore()
    }, 500)
  }
}

function checkForHighScore(){
let storageScore = localStorage.getItem('zooKeeper_highScore')
let highScore = 0
if(storageScore){
  highScore = parseInt(storageScore)
}
console.log('💹', highScore);
  if(highScore < money){
    window.alert('You got the new highScore! ' + money)
    localStorage.setItem('zooKeeper_highScore', money.toString())
  }
}

