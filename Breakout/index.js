 const grid = document.querySelector('.grid')
 const scoreDisplay = document.querySelector('#score')
 const blockWidth = 100;
 const blockHeight = 20;
 const boardWidth = 560;
 const boardHeight = 300;
 const ballDiameter = 20;
 let timerId
 let xDirection = -2
 let yDirection = 2
 let score = 0
 const userStart = [230,10]
 let currPosition = userStart

 const ballStart = [270,40]
 let ballCurrentPosition = ballStart


 //create block class
 class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis+blockWidth,yAxis]
        this.topLeft = [xAxis, yAxis+blockHeight]
        this.topRight =  [xAxis+blockWidth,yAxis+blockHeight]

    }
    
 } 
// All my blocks
 const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
 ]

 //draw all my block
 function addBlock() {
    for(let i =0;i < blocks.length;i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1]+ 'px'
        grid.appendChild(block) 
    }
 }

 addBlock()

 //add user

 const user =  document.createElement('div')
 user.classList.add('user')
 drawUser()
 grid.appendChild(user)

 // Draw User

 function drawUser(){
    user.style.left = currPosition[0] + 'px'
    user.style.bottom = currPosition[1] + 'px'
 }
 // Drew Ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0]+'px'
    ball.style.bottom = ballCurrentPosition[1]+'px'
}




 //move user

 function moveUser(e) {
      switch(e.key){
        case'ArrowLeft':
        if(currPosition[0] > 0){
            currPosition[0] -=10  
            drawUser()
            
        }
        break;
        case 'ArrowRight':
            if(currPosition[0] < boardWidth-blockWidth){
                currPosition[0]+=10
                drawUser()
            }
            break;
                   
      }
 }

 document.addEventListener('keydown', moveUser)


 // CREATE BALL

 const ball = document.createElement('div')
 ball.classList.add('ball')
 drawBall()
 grid.appendChild(ball)

 //Move Ball

 function moveBall(){
  ballCurrentPosition[0]+=xDirection
  ballCurrentPosition[1]+=yDirection
  drawBall()
  checkCollision()//Every 30ms we are checking for collision
 }

 timerId = setInterval(moveBall,30)
 //clear the timerId to stop the ball 

 //Check the collision
 function checkCollision() {
   // check for Block collision
   for(let i =0; i< blocks.length;i++){
    if(
        (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
        ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1]  && ballCurrentPosition[1] < blocks[i].topLeft[1])
    ){
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i,1)//remove 1 element from the array
        changeDirection()
        score++;
        scoreDisplay.innerHTML = score

        //check for Win

        if(blocks.length == 0 ){
         scoreDisplay.innerHTML = 'YOU WIN!'
         clearInterval(timerId)
         document.removeEventListener('keydown',moveUser)
        }
    }
   }
    // checl for wall collision
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
       ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
       ballCurrentPosition[0] <= 0
    ){
        changeDirection()
    }
  // check for user collisions
  if(
  (ballCurrentPosition[0] > currPosition[0] && ballCurrentPosition[0] < currPosition[0]+ blockWidth) &&
  (ballCurrentPosition[1] > currPosition[1] && ballCurrentPosition[1] < currPosition[1]+ blockHeight)
  )
  {
  changeDirection()
  }


    // Check for Game Over
    if(ballCurrentPosition[1] <=0){
        clearInterval(timerId)
        scoreDisplay.textContent = 'You Loose'
        document.removeEventListener('keydown',moveUser)

    }
 }

 function changeDirection(){
   if(xDirection == 2 && yDirection == 2){
    yDirection = -2
    return 
   }
   if(xDirection == 2 && yDirection == -2){
    xDirection = -2
    return
   }
   if(xDirection == -2 && yDirection == -2){
    yDirection = 2
    return
   }
   if(xDirection == -2 && yDirection == 2){
    xDirection = 2
    return
   }
 }