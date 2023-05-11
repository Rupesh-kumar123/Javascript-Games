const cardArray =[
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
]



cardArray.sort(() => 0.5 - Math.random()) //Trick to Sort an array 
const gridDisplay = document.querySelector('#grid')
const resultDisplay= document.querySelector('#result')
// console.log(gridDisplay)
let cardChoosen = []
let cardChoosenIds = []
let cardsWon = []


function createBoard() { // function to create our board 
    for(let i =0; i<cardArray.length; i++){
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)// We are calling the flip card function whenever we click on board
      gridDisplay.appendChild(card)
      
    }
}

createBoard()

function checkMatch(){
    
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChoosen[0];
    const optionTwoId = cardChoosen[1];
    if(optionOneId === optionTwoId){
        alert('you found a match')
        cards[cardChoosenIds[0]].setAttribute('src', 'images/white.png')
        cards[cardChoosenIds[1]].setAttribute('src', 'images/white.png')
        cards[cardChoosenIds[0]].removeEventListener('click', flipCard)
        cards[cardChoosenIds[1]].removeEventListener('click', flipCard)

        cardsWon.push(cardChoosen)
    }else{
        cards[cardChoosenIds[0]].setAttribute('src', 'images/blank.png')
        cards[cardChoosenIds[1]].setAttribute('src', 'images/blank.png')
        alert('sorry try Again')
    }
    resultDisplay.innerHTML = cardsWon.length
    cardChoosen = []
    cardChoosenIds = []

    if(cardsWon.length === (cardArray.length)/ 2){
       resultDisplay.innerHTML = 'Congrats you found them all'
    }
}

function flipCard() {
const cardId = this.getAttribute('data-id') //this is the keyword we are using to get the card we clicked 
cardChoosen.push(cardArray[cardId].name)
cardChoosenIds.push(cardId)
// console.log(cardChoosenIds)
this.setAttribute('src',cardArray[cardId].img)
if(cardChoosen.length === 2){
    setTimeout(checkMatch, 500)
}
}