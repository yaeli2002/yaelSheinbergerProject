const wrapper = document.querySelector(".wrapper");
const playContainer = document.querySelector(".game-container");
const documentScore = document.querySelector(".score");
const documentHighScore = document.querySelector(".high-score");
const popup = document.querySelector(".popup-container");
const startBotton = document.getElementById("start-game");
const restart = document.getElementById("restart-btn");
const message = document.getElementById("message");
let foodX, foodY, choosedFood, velocityX = 0, velocityY = 0, score = 0;
let snakeBody = [], time = 115, setIntervalId;
let snakeX = 10, snakeY = 15;
let highScore = localStorage.getItem("high-score") || 0;


const changeFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}


const checkAte = () => {
    if (snakeX == foodX && snakeY == foodY) {
        changeFood();
        score += 1;
        highScore = score > highScore ? score : highScore;
        snakeBody.push([foodX, foodY]);
    }
    documentScore.innerHTML = `Score: ${score}`;
    localStorage.setItem("high-score", highScore);
    documentHighScore.innerHTML = `High Score: ${highScore}`;
};


const changeDiraction = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
};


const arrangementCellFood = () => {
    let htmlSelected = "";
    htmlSelected += `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    checkAte();

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlSelected += `<div class="head-food" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            endGame();
        }
    }
    playContainer.innerHTML = htmlSelected;
};

const startGame = () => {
    clearInterval(setIntervalId);
    setIntervalId = setInterval(arrangementCellFood, time);
    snakeX = 10;
    snakeY = 15;
    snakeBody = [];
    popup.classList.add("hide");
    wrapper.classList.remove("hide");
    score = 0;
    documentScore.innerHTML = `Score: ${score}`;
    documentHighScore.innerHTML = `High Score: ${highScore}`;
    changeFood();
    arrangementCellFood();
    document.addEventListener("keydown", changeDiraction);

};

startGame();

const endGame = () => {
    popup.classList.remove("hide");
    wrapper.classList.add("hide");
    message.innerHTML = `<div>Score: ${score}<div><div>High Score: ${highScore}</div>`;
    clearInterval(setIntervalId);
}

startBotton.addEventListener("click", () => {
    startGame();
});

restart.addEventListener("click", () => {
    setTimeout(startGame, 400);
});