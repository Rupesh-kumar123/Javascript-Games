const squares = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const moleGen = document.querySelector('.btn')

let result = 0
let hitPosition
let currentTime = 10
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')//Agr mole phle se prestne hai to usko hatane ke liye ham ye kr rhe hai
    })
    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}

squares.forEach(squar => {
    squar.addEventListener('mousedown', () => {
        if(squar.id == hitPosition) {
            result++  
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole(){
    
    timerId = setInterval(randomSquare, 1000)
}

moveMole()

function countDown(){
   currentTime--
   timeLeft.textContent = currentTime

   if(currentTime === 0){
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert("GAME OVER! Your Final Score Is " + result)
   }
}

let countDownTimerId = setInterval(countDown,1000)