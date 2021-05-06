
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
    container.innerHTML = '';
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
        speed: 0,
        lives: 3,
        score: 0,
        neededPasses: 3,
        roadWidth: 250,
        gameOverCount: 0
    }
    startBoard();
    setupOtherCars(10);
}

function setupOtherCars(num){
    for(let x = 0; x < num; x++){
        let temp = "enemy" + (x + 1);
        let div = document.createElement('div');
        div.innerHTML = (x + 1)
        div.setAttribute('class', "enemy");
        div.setAttribute('id', temp)
        makeEnemy(div);
        container.appendChild(div)    
    }
}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return('0'+ String(hex)).substr(-2);
    }
    return '#'+c()+c()+c();
}

function makeEnemy(e){
    let tempRoad = document.querySelector('.road');
        e.style.left = tempRoad.offsetLeft + 
        Math.ceil(Math.random() * tempRoad.offsetWidth) - 30 +'px';
        e.style.top = Math.ceil(Math.random() * -400) + 'px';
        e.speed = Math.ceil(Math.random() * 17) + 2;
        e.style.backgroundColor = randomColor();
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

function isCollision(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return!(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right)
    )
}

function moveEnemies(){
    let tempEnemy = document.querySelectorAll('.enemy');
    for(let i = 0; i < tempEnemy.length; i++){
      for(let j = 0; j < tempEnemy.length; j++){
          if(i != j && carCrash(tempEnemy[i], tempEnemy[j])){
              tempEnemy[j].style.top = (tempEnemy[j].offsetTop + 20) + 'px';
              tempEnemy[i].style.top = (tempEnemy[i].offsetTop - 20) + 'px';
              tempEnemy[j].style.left = (tempEnemy[j].offsetLeft - 20) + 'px';
              tempEnemy[i].style.left = (tempEnemy[i].offsetLeft + 20) + 'px';  
          }
      }
        let y = tempEnemy[i].offsetTop + player.speed - tempEnemy[i].speed
        if(y > 2000 || y < -2000){
            if(y > 2000){
                player.score++;
                if(player.score > player.neededPasses){
                    gameOverPlay();
                }
            }
            makeEnemy(tempEnemy[i]);
        }else {
            tempEnemy[i].style.top = y + 'px'
            let carCrash = isCollision(tempEnemy[i], player.ele)
            if(carCrash){
                player.speed = 0;
                player.lives --;
                if(player.lives < 1){
                  player.gameOverCount = 1;     
                }
                makeEnemy(tempEnemy[i]);
            }
        }
    }
}

function gameOverPlay(){
    let div = document.createElement('div');
    div.setAttribute("class", "road");
    div.style.top = '0px';
    div.style.width = '250px';
    div.style.backgroundColor = 'red'
    div.innerHTML = 'FINISH'
    div.style.fontSize = '3em';
    container.appendChild(div);
    player.gameOverCount = 12;
    player.speed = 0;
}

function playGame(){
    if(gamePlay){
        updateDash()
        //movement
        let roadParams = moveRoad();
        moveEnemies();
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
    if(player.gameOverCount > 0){
        player.gameOverCount--;
        player.y = (player.y > 60) ? player.y -30 : 60;
        if(player.gameOverCount == 0){
            gamePlay = false;
            cancelAnimationFrame(animationGame)
            startButton.style.display = "block";
        }
    }
}

// add space background, spaceship functionality etc.
//next step add obstacles
