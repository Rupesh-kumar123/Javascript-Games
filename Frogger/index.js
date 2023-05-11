const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseBtn = document.querySelector('#play-pause-btn')
const squares = document.querySelectorAll('.grid div')// All the divs inside of the grid class
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
 
let currIndex = 76
const width = 9
let timerId 
let currTime = 20

function moveFrog(e) {
    squares[currIndex].classList.remove('frog')
    switch(e.key){
        case 'ArrowLeft':
            console.log('Move Left')
            if(currIndex % width !==0) currIndex-=1
                
            break
        case 'ArrowRight':
            console.log('Move Right')
            if(currIndex % width < width-1)currIndex+=1
            break
        case 'ArrowUp':
            console.log('Move Up')
            if(currIndex - width >=0) currIndex-=width
            break
        case 'ArrowDown':
            console.log('Move Down')
            if(currIndex+width < width * width)currIndex+=width    
            break
    }

    squares[currIndex].classList.add('frog')
}


function autoMoveElements(){
    currTime--
    timeLeftDisplay.textContent = currTime
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
  logsRight.forEach(logRight =>moveLogRight(logRight))
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
  loose()
  win()

}


function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function loose(){
    // if the frog class contains class of road or water then its game over means id it contains c1 ,c2 or 

    if(squares[currIndex].classList.contains('c1') ||
       squares[currIndex].classList.contains('l4') ||
       squares[currIndex].classList.contains('l5') ||
       currTime <=0``
    ){
         resultDisplay.textContent = 'YOU LOOSE!'
         clearInterval(timerId)
         squares[currIndex].classList.remove('frog')
         document.removeEventListener('keyup',moveFrog)

    }
}

function win(){
    if(squares[currIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keyup',moveFrog)
    }
}
startPauseBtn.addEventListener('click', () =>{
    if(timerId){
        clearInterval(timerId)
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    }else{
        timerId = setInterval(autoMoveElements,1000)
        document.addEventListener('keyup', moveFrog)
    }
})
