const btnOption = document.querySelectorAll(".button-option");
const btnRestart = document.getElementById('restart');
const popup = document.querySelector('.popup-container');
const msg = document.getElementById('message');
const btnStartGame = document.getElementById('start-game');

/*The option to win the game*/
const WinningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

let xTurn = true;
let count = 0;

/*Initialize all variables so that the player can play again.*/
const beginingGame = () => {
    count = 0;
    xTurn = true; // 
    btnOption.forEach((option) => {
        option.innerText = "";
        option.disabled = false;
    });
    popup.classList.add("hide");
};


/*When the game is over and there is a winner or not, there will be no option to continue the game, and a message is sent to the game about the results of the game.*/
const endGame = (letter = null) => {
    btnOption.forEach((option) => option.disabled = true);
    setTimeout(() => popup.classList.remove("hide"), 500);
    if (letter === "finish") {
        console.log(letter);
        msg.innerHTML = `&#x2639; oops.. <br>try again`;
    } else if (letter === "x") {
        msg.innerHTML = `&#x1F389; x wins !!`;
    } else {
        msg.innerHTML = `&#x1F389; o wins !!`;
    }
};

const winCheck = () => {
    for (let i of WinningPossibilities) {
        let [option1, option2, option3] = [
            btnOption[i[0]].innerText,
            btnOption[i[1]].innerText,
            btnOption[i[2]].innerText,
        ];
        if (option1 !== "" && option1 === option2 && option2 === option3) {
            endGame(option1);
            return true;
        }
    }
    return false;
};

const computerMove = () => {
    let emptyCells = [];
    btnOption.forEach((option, index) => {
        if (option.innerText === "") {
            emptyCells.push(index);
        }
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const moveIndex = emptyCells[randomIndex];
    btnOption[moveIndex].innerText = 'o';
    btnOption[moveIndex].disabled = true;
};

const isWinningMoveAvailable = (player) => {
    for (let i of WinningPossibilities) {
        let [option1, option2, option3] = [
            btnOption[i[0]].innerText,
            btnOption[i[1]].innerText,
            btnOption[i[2]].innerText,
        ];
        if (option1 === player && option2 === player && option3 === "") {
            return i[2];
        }
        if (option1 === player && option3 === player && option2 === "") {
            return i[1];
        }
        if (option2 === player && option3 === player && option1 === "") {
            return i[0];
        }
    }
    return -1;
};

const computerPlay = () => {
    count += 1;
    if (!checkGameEnd()) {
        if (!xTurn) { // Check if it's computer's turn
            let winMove = isWinningMoveAvailable('o');
            if (winMove !== -1) {
                btnOption[winMove].innerText = 'o';
                btnOption[winMove].disabled = true;
                winCheck();
                xTurn = true; // Change turn back to player after computer's move
                return;
            }
            computerMove();
            winCheck();
            xTurn = true; // Change turn back to player after computer's move
        }
    }
};

btnOption.forEach((option) => {
    option.addEventListener('click', () => {
        if (xTurn && option.innerText === "") {
            xTurn = false;
            option.innerText = 'x';
            option.disabled = true;
            count += 1;
            if (!winCheck() && !checkGameEnd()) {
                setTimeout(computerPlay, 500); // Adding a delay for computer's turn
            }
        }
    });
});


const checkGameEnd = () => {
    console.log(count);
    if (count === 9) {
        endGame("finish");
        return true;
    }
    return false;
};

btnStartGame.addEventListener("click", () => beginingGame());
btnRestart.addEventListener("click", () => beginingGame());

