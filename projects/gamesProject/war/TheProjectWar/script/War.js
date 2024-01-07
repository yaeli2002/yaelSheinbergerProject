const cardPlace = document.querySelector(".cardPlace");
const cardPlace2 = document.querySelector(".cardPlace2");
const Player1btn = document.getElementById("Player1btn");
const Player2btn = document.getElementById("Player2btn");
const countPlay1 = document.getElementById("countPlay1");
const countPlay2 = document.getElementById("countPlay2");


let cardFromArray;
let cardChoose1;
let cardChoose2;
let arrayPlayer1 = [];
let arrayPlayer2 = [];
let array2 = [];
let array3 = [];
let number1;
let number2;
let shape1;
let shape2;
let count1 = 0;
let count2 = 0;


class cardGame {
    constructor(number, shape, image) {
        this.number = number;
        this.shape = shape;
        this.image = image;
    }
    get(propName) {
        return this[propName];
    }
};

let array = [new cardGame(14, "rhombus", "./images/1.png"),
new cardGame(2, "rhombus", "./images/2.png"),
new cardGame(3, "rhombus", "./images/3.png"),
new cardGame(4, "rhombus", "./images/4.png"),
new cardGame(5, "rhombus", "./images/5.png"),
new cardGame(6, "rhombus", "./images/6.png"),
new cardGame(7, "rhombus", "./images/7.png"),
new cardGame(8, "rhombus", "./images/8.png"),
new cardGame(9, "rhombus", "./images/9.png"),
new cardGame(10, "rhombus", "./images/10.png"),
new cardGame(11, "rhombus", "./images/11.png"),
new cardGame(12, "rhombus", "./images/12.png"),
new cardGame(13, "rhombus", "./images/13.png"),
new cardGame(14, "flower", "./images/1b.png"),
new cardGame(2, "flower", "./images/2b.png"),
new cardGame(3, "flower", "./images/3b.png"),
new cardGame(4, "flower", "./images/4b.png"),
new cardGame(5, "flower", "./images/5b.png"),
new cardGame(6, "flower", "./images/6b.png"),
new cardGame(7, "flower", "./images/7b.png"),
new cardGame(8, "flower", "./images/8b.png"),
new cardGame(9, "flower", "./images/9b.png"),
new cardGame(10, "flower", "./images/10b.png"),
new cardGame(11, "flower", "./images/11b.png"),
new cardGame(12, "flower", "./images/12b.png"),
new cardGame(13, "flower", "./images/13b.png"),
new cardGame(14, "love", "./images/1l.png"),
new cardGame(2, "love", "./images/2l.png"),
new cardGame(3, "love", "./images/3l.png"),
new cardGame(4, "love", "./images/4l.png"),
new cardGame(5, "love", "./images/5l.png"),
new cardGame(6, "love", "./images/6l.png"),
new cardGame(7, "love", "./images/7l.png"),
new cardGame(8, "love", "./images/8l.png"),
new cardGame(9, "love", "./images/9l.png"),
new cardGame(10, "love", "./images/10l.png"),
new cardGame(11, "love", "./images/11l.png"),
new cardGame(12, "love", "./images/12l.png"),
new cardGame(13, "love", "./images/13l.png")
];


/*Choosing random cards of the game for player 1*/
const dealCardsPlayer = () => {
    const cardChoose = Math.floor(Math.random() * array.length);
    /*Deleting the card from the big array.*/
    const removedCard = array.splice(cardChoose, 1);
    return removedCard[0];
};
/*Distribution of the half cards randomly to the first player.*/
const dealCardsPlayer1 = () => {
    let card;
    for (let i = 0; i < (39 / 2); i++) {
        card = dealCardsPlayer();
        array2.push(card);
    }
    count1 = array2.length;
}
/*Distribution of the half cards randomly to the second player.*/
const dealCardsPlayer2 = () => {
    array3 = array;
    count2 = array3.length;
}

const addCardPlayer1 = () => {
    cardChoose1 = 0;
    cardPlace.innerHTML = `<img src="${array2[cardChoose1].get('image')}" class="card-img-top" alt="...">`;
    console.log(array2);
    console.log("cardChoose1", cardChoose1);
    number1 = array2[cardChoose1].get('number');
}

const addCardPlayer2 = () => {
    cardChoose2 = 0;
    cardPlace2.innerHTML = `<img src="${array3[cardChoose2].get('image')}" class="card-img-top" alt="...">`;
    number2 = array3[cardChoose2].get('number');
}

const number1Win = () => {
    /*Deleting the card from the big array.*/
    const removedCard = array3.splice(cardChoose2, 1);
    array2.push(removedCard[0]);
    /*Moving the card from its first position in the array to its end.*/
    const cardToMove = array2.shift();
    array2.push(cardToMove);
};

const number2Win = () => {
    /*Deleting the card from the big array.*/
    const removedCard = array2.splice(cardChoose1, 1);
    array3.push(removedCard[0]);
    /*Moving the card from its first position in the array to its end.*/
    const cardToMove = array3.shift();
    array3.push(cardToMove);
};

/*If the cards are equal, you should go to the fourth card after the current card and compare whether they are equal.*/
const equalValues = () => {
    let counter = 3;
    number1 = array2[counter].get('number');
    number2 = array3[counter].get('number');
    if (number1 > number2) {
        console.log("The winner is player1", array2[3]);
        while (counter >= 0) {
            const removedCard = array3.splice(cardChoose2, 1);
            array2.push(removedCard[0]);
            const cardToMove = array2.shift();
            array2.push(cardToMove);
            console.log("counter : " + counter);
            counter--;
        }
        cardPlace.innerHTML = `<img src="${array2[0].get('image')}" class="card-img-top" alt="...">`;
        number1 = array2[0].get('number');
    }
    else if (number2 > number1) {
        console.log("The winner is player1", array3[3]);
        while (counter >= 0) {
            const removedCard = array2.splice(cardChoose1, 1);
            array3.push(removedCard[0]);
            const cardToMove = array3.shift();
            array3.push(cardToMove);
            console.log("counter : " + counter);
            counter--;
        }
        cardPlace2.innerHTML = `<img src="${array3[0].get('image')}" class="card-img-top" alt="...">`;
        number2 = array3[0].get('number');
        console.log("count2 " + count2);
    }
};

/*Checking which card's value is higher.*/
const chechNumber = () => {
    console.log("number1 " + number1 + " number2 " + number2);
    if (number1 > number2) {
        number1Win();
    }
    else if (number2 > number1) {
        number2Win();
    }
    else if (number1 == number2) {
        setTimeout(equalValues, 800);
    }
};

/*Start the game*/
const startGame = () => {
    dealCardsPlayer1();
    dealCardsPlayer2();
}
startGame();
/*The first player's turn*/
Player1btn.addEventListener("click", () => {
    if (array2.length == 39) {
        alert("Player 1 win!!");
    }
    addCardPlayer1();
    count1 = array2.length;
});
/*The second player's turn*/
Player2btn.addEventListener("click", () => {
    if (array3.length == 39) {
        alert("Player 2 win!!");
    }
    addCardPlayer2();
    count2 = array3.length;
    setTimeout(chechNumber, 400);
    /*The amount of cards each player has.*/
    countPlay1.innerHTML = `<span>Cards: ${count1}</span>`;
    countPlay2.innerHTML = `<span>Cards: ${count2}</span>`;
});
