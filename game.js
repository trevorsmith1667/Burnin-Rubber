
const speedo = document.querySelector('.speedo');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const container = document.getElementById('container');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);


let animationGame =requestAnimationFrame(playGame);
let gamePlay = false;
let keys = {
    arrowUp: false, 
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false

}
//Game variables
function startGame(){
    var div = document.createElement('div');
    div.setAttribute('class', 'playerCar');
    div.x = 250;
    div.y = 500
    container.appendChild(div);
    gamePlay = true;
}

function pressKeyOn(){

}

function pressKeyOff(){

}

function playGame(){
    if(gamePlay){
    console.log('game in play');
    animationGame = requestAnimationFrame(playGame)
    }
}