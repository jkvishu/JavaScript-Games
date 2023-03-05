const playboard = document.querySelector(".play-board");
const scoreboard = document.querySelector(".score");
const scoreHboard = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const s1 = "./sounds/eat.mp3";
const s2 = "./sounds/over.mp3";
const eatsound = new Audio(s1);
const oversound = new Audio(s2);

let foodx, foody;
let gameover = false;
let snakex = 13, snakey = 14;
let snakeBody = [];
let setIntervalid;
let score = 0;
let velocityX = 0, velocityY = 0;


let Highscore = localStorage.getItem("high-score") || 0;
scoreHboard.innerText = `High Score: ${Highscore}`;


const plys1 = () => {
    eatsound.play();
}

const plys2 = () => {
    oversound.play();
}

const chngfpos = () => {
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
}


const handleGameOver = () => {
    plys2();
    clearInterval(setIntervalid);
    alert("Game Over! Press OK to Play Again....");
    location.reload();
}

const SetDirection = (e) => {
    console.log(e);
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => {
        SetDirection({ key: key.dataset.key })
    })
});

const initGame = () => {
    //inserting the food in the playground by injecting html and css inside the div to render it through a function.
    if (gameover) return handleGameOver();
    let htmlmp = `<div class="food" style="grid-area: ${foody}/${foodx}"></div>`;
    if (snakex === foodx && snakey === foody) {
        chngfpos();
        plys1();
        snakeBody.push([foodx, foody]);
        score++;
        Highscore = score >= Highscore ? score : Highscore;
        localStorage.setItem("high-score", Highscore);
        scoreboard.innerText = `Current Score: ${score}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakex, snakey];
    snakex += velocityX;
    snakey += velocityY;
    if (snakex <= 0 || snakex > 30 || snakey <= 0 || snakey > 30) {
        gameover = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        htmlmp += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameover = true;
        }
    }
    playboard.innerHTML = htmlmp;
}

chngfpos();
setIntervalid = setInterval(initGame, 125);
document.addEventListener("keydown", SetDirection);