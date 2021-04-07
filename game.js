
const speedo = document.querySelector('.speedo');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const container = document.getElementById('container');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);


//Game variables
let gamePlay = false;
let player 
let keys = {
    ArrowUp: false, 
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
    
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
    animationGame = requestAnimationFrame(playGame);
    player = {
        ele: div,
        speed: 1,
        lives: 3,
        score: 0,
        neededPasses: 10,
        roadWidth: 250,
    }
    startBoard();
}
function startBoard(){
    for(let x = 0;x< 13; x++){
        let div = document.createElement('div')
        div.setAttribute('class', 'road')
        div.style.top = (x*50) + 'px';
        container.appendChild(div)
    }
}
function pressKeyOn(event){
    event.preventDefault();
    console.log(keys);
    keys[event.key] = true
}

function pressKeyOff(event){
    event.preventDefault();
    console.log(keys);
    keys[event.key] = false


}

function updateDash(){
    // console.log(player)
    score.innerHTML = player.score;
    lives.innerHTML = player.lives;
    speedo.innerHTML = player.speed;
}

function playGame(){
    if(gamePlay){
        updateDash()
        if (keys.ArrowUp){
            console.log(player.ele.x)
        }
    }
animationGame = requestAnimationFrame(playGame)
}