
const speedo = document.querySelector('.speedo');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const container = document.getElementById('container');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);


//Game variables
let animationGame = requestAnimationFrame(playGame);
let gamePlay = false;
let player 
let keys = {
    arrowUp: false, 
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false

}
function startGame(){
    console.log(gamePlay);
    startButton.style.display='none'
    var div = document.createElement('div');
    div.setAttribute('class', 'playerCar');
    div.x = 250;
    div.y = 500
    container.appendChild(div);
    gamePlay = true;
    player = {
        speed: 1,
        lives: 3,
        gameScore: 0,
        neededPasses: 10
    }
}

function pressKeyOn(){

}

function pressKeyOff(){

}

function updateDash(){
    console.log(player)
}

function playGame(){
    if(gamePlay){
    updateDash()
    }
animationGame = requestAnimationFrame(playGame)
}