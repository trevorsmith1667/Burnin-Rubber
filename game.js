
const speedo = document.querySelector('.speedo');
const score = document.querySelector('.score');
const lives = document.querySelector('.lives');
const container = document.getElementById('container');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);


//Game variables
let animationGame
let gamePlay = false;
let player 
let keys = {
    ArrowUp: false, 
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
    
}
function startGame(){
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
        speed: 9,
        lives: 3,
        score: 0,
        neededPasses: 10,
        roadWidth: 250,
    }
    startBoard();
}
function startBoard(){
    for(let x = 0; x < 13; x++){
        let div = document.createElement('div')
        div.setAttribute('class', 'road')
        div.style.top = (x * 50) + 'px';
        container.appendChild(div)
    }
}
function pressKeyOn(event){
    event.preventDefault();
    keys[event.key] = true
}

function pressKeyOff(event){
    event.preventDefault();
    keys[event.key] = false


}

function updateDash(){
    // console.log(player)
    score.innerHTML = player.score;
    lives.innerHTML = player.lives;
    speedo.innerHTML = Math.round(player.speed * 13);
}

function moveRoad(){
    let tempRoad = document.querySelectorAll('.road')
    let prevRoad = tempRoad[0].offsetLeft;
    let prevWidth = tempRoad[0].offsetWidth;
    const pSpeed = Math.floor(player.speed);
    for(let x = 0; x < tempRoad.length; x++){
        let num = tempRoad[x].offsetTop + pSpeed;
        if(num > 600){
            num = num - 650;
            let mover = prevRoad + (Math.floor(Math.random() * 6) - 3);
            let roadWidth = (Math.floor(Math.random()* 11) - 5) + prevWidth;
            if (roadWidth < 200) roadWidth = 200;
            if (roadWidth > 400) roadWidth = 400;
            if (mover < 100) mover = 100;
            if (mover > 600) mover = 600;
            tempRoad[x].style.left = mover + "px";
            tempRoad[x].style.width = roadWidth + "px";
            prevRoad = tempRoad[x].offsetLeft;
            prevWidth = tempRoad[x].width;
        }
        tempRoad[x].style.top = num + 'px';
    }
    return {'w': prevWidth, 'left' : prevRoad};
}

function playGame(){
    if(gamePlay){
        updateDash()
        //movement
      let roadParams = moveRoad();
        if (keys.ArrowUp){
           if (player.ele.y > 400) player.ele.y -= 1;
            player.speed = player.speed < 20 ? (player.speed + 0.05) : 20;
        }
        if(keys.ArrowDown){
            if (player.ele.y < 500) {player.ele.y += 1};
            player.speed = player.speed > 0 ? (player.speed - 0.2) : 0;
        }
        if(keys.ArrowRight){
            player.ele.x += (player.speed / 4);
        }
        if(keys.ArrowLeft){
            player.ele.x -= (player.speed / 4);
        }
        // check if on road
        if ((player.ele.x + 40) < roadParams.left || 
        (player.ele.x > (roadParams.left + roadParams.width))){
            if (player.ele.y < 500) { player.ele.y += 1 };
            player.ele.y += + 1;
            player.speed = player.speed > 0 ? (player.speed - 0.2) : 1;
            console.log('OFFROAD')

        }
        //move playerCar

        player.ele.style.top = player.ele.y + 'px';
        player.ele.style.left = player.ele.x + 'px';
    }
    animationGame = requestAnimationFrame(playGame)
}

// add space background, spaceship functionality etc.
//next step add obstacles
