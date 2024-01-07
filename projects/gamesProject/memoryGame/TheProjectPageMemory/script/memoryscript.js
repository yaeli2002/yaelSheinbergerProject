/* Defining variables and linking them to their place in the html file. */
const moves = document.getElementById('movesCount');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const result = document.getElementById('result');
const wellcome = document.getElementById('wellcome');
const gameContainer = document.querySelector('.game-container');
const controlsContainer = document.querySelector('.controls-container');
let winCount, cards, firstCard = false, secondCard = false, level;

/* Creating an array of objects where each object will contain an image from the game and the name of the image. */
let items = [{ name: "bear", image: "./images/bear.jpg" },
{ name: "cat", image: "./images/cat.jpg" },
{ name: "dog", image: "./images/dog.jpg" },
{ name: "fox", image: "./images/fox.jpg" },
{ name: "leopard", image: "./images/leopard.jpg" },
{ name: "Rabbit", image: "./images/Rabbit.jpg" },
{ name: "zebra", image: "./images/zebra.jpg" },
{ name: "lion", image: "./images/lion.jpg" }];

/*  Creating a function to calculate the game time.   */
let seconds = 0, minutes = 0;
const timeCalculation = () => {
    seconds += 1;
    if (seconds > 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time: </span> ${minutesValue}:${secondsValue}`;
};

/*Calculation of actions in the game.*/
let actionCount = 0;
const actionCounter = () => {
    actionCount += 1;
    moves.innerHTML = `Moves: ${actionCount}`;
};

/*Taking random values from the image arrays.*/
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = ``;
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML +=
            `<div class="card-container col" data-card-value="${cardValues[i].name}">
                <div class="card-before"></div>
                    <div class="card-after"> 
                        <img src="${cardValues[i].image}" class="image" id="img-card"/>
                    </div>
            </div>`;
    }
    /*******************************************************************************************************/
    cards = document.querySelectorAll('.card-container');
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                /*try*/
                card.disabled = true;
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    actionCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            setTimeout(() => {
                                result.innerHTML = `<h2>You won!!</h2>
                            <h4>Moves: ${actionCount}</h4>`;
                                wellcome.innerHTML = '';
                                stopGame();
                            }, 800);

                        }
                    }
                    else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }

        });
    });

};

const initrializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};

/*Adding a click element to the start button, so that it starts the game,
 and resetting the elements to start the game.*/
startButton.addEventListener("click", () => {
    actionCount = 0;
    time = 0;
    controlsContainer.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeCalculation, 1000);
    moves.innerHTML = `Moves:${actionCount}`;
    initrializer();
});

/*Adding a clicking element to the end button, in order to stop the game, 
and changing the elements needed to end the game.*/
stopButton.addEventListener("click", stopGame = () => {
    controlsContainer.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
});