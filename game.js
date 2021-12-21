var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var speedBallX = 5;
var speedBallY = 5;
var paddle1X = 0;
var paddle1Y = 80;
var player1Score = 0;
var player2Score = 0;
var paddle2Y = 100;
const WINNING_SCORE = 3;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
var win = false;

window.onload = function () {
  console.log("Hello");
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  const fps = 60;
  setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / fps);

  canvas.addEventListener("mousemove", function (event) {
   var mousePos = calculateMousePosition(event);
    paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    
  });

  canvas.addEventListener('mousedown',function(){
      if(win){
          player1Score=0;
          player2Score=0;
          win=false;
      }
  })
};

function calculateMousePosition(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY,
  };
}

function moveComputer(){
    var paddle2Center = paddle2Y + (PADDLE_HEIGHT/2); 
    if(paddle2Center<ballY-40){
          paddle2Y+=6;
      }   
      else if (paddle2Center>ballY+40){
          paddle2Y-=6; 
      }
}
function moveEverything() {
    if(win) return;
   moveComputer();
  ballX = ballX + speedBallX;
  ballY += speedBallY;

  if (ballX < 0) {
      if(ballY>paddle1Y&&ballY<paddle1Y+PADDLE_HEIGHT){
          speedBallX = -speedBallX;
      }
      else{
          player2Score++;
        resetBall();
      }
    
  }

  if (ballX > canvas.width) {
      if(ballY>paddle2Y&&ballY<paddle2Y+PADDLE_HEIGHT){
          speedBallX = -speedBallX;
      }
      else{
          player1Score++;
          resetBall();  
      }
    
  }

  if (ballY < 0) {
    speedBallY = -speedBallY;
  }

  if (ballY > canvas.height) {
    speedBallY = -speedBallY;
  }
}
function drawEverything() {
  //Create main Canvas
  createRect(0, 0, canvas.width, canvas.height, "red");
 //Check win
  if(win) {
      canvasContext.fillStyle='white';
      if(player1Score>=WINNING_SCORE) {
        canvasContext.font="50px Verdana";
          canvasContext.fillText("Player Won",100,100);
          canvasContext.fillText("Click to Continue",100,200);
      }
      else if(player2Score>=WINNING_SCORE){
        canvasContext.font="50px Verdana";

          canvasContext.fillText("CPU Won",100,100);
          canvasContext.fillText("Click to Continue",100,200);
      }
      return;
  }
  //Create paddle1
  createRect(paddle1X, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "green");

  // Draw net
  drawNet();
  // Create Paddle2
  createRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "green");
  //Create circle ball
  createCircle(ballX, ballY, 10, "white");
  canvasContext.font="50px Verdana";
  canvasContext.fillText(player1Score,100,100);
  
  canvasContext.fillText(player2Score,canvas.width-100,100);
  canvasContext.fillText("DP Projects",canvas.width-300,canvas.height-100);
}

function createRect(x, y, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(x, y, width, height);
}

function createCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}


function resetBall(){
    speedBallX = -speedBallX;
    var deltaY = ballY - (paddle2Y-PADDLE_HEIGHT/2);
    speedY = deltaY*0.35;
    if(player1Score>=3||player2Score>=3){
       
        win=true;
    }
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function drawNet(){
    for(var i = 0 ; i <canvas.height ; i+=40){
        createRect(canvas.width/2-1,i,2,10,'white');
    }
}