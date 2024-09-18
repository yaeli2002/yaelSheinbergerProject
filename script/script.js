let openingAnimation = document.querySelector(".opening-container");
window.addEventListener("scroll", () => {
    openingAnimation.style.backgroundSize = `${window.scrollY * 1.8 + 1600}px`
});

/******************************************************about script******************************************************* */
let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];


    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    nextWord.style.opacity = "1";

    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}


changeText();
setInterval(changeText, 2000)



/********************************************Skills script******************************************** */


/*const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');

    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }

})*/

// Wrap your JavaScript code inside a function
function applySkillsAnimation() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        var dots = elem.getAttribute("data-dots");
        var marked = elem.getAttribute("data-percent");
        var percent = Math.floor(dots * marked / 100);
        var points = "";
        var rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll('.points');

        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });
}

// Add an event listener to run the applySkillsAnimation function when the user scrolls within the "skills" area
document.addEventListener("scroll", function () {
    const skillsContainer = document.getElementById("skills");
    const skillsContainerRect = skillsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (skillsContainerRect.top < windowHeight && skillsContainerRect.bottom > 0) {
        applySkillsAnimation();
    }
});


/*******************************************Menu script**************************************************************** */
let menuIcon = document.querySelector("#menu-icon");
let navList = document.querySelector(".nav-list");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
}

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navList.classList.remove("open");
}

/*******************************************End menu script**********************************************/
/*******************************Toogler style switcher*************************************************/
const styleSwitcherToogler = document.querySelector(".toogler-color");
styleSwitcherToogler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

//Design so that when the user scrolls the page then the color menu will close.
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

//Choosing the color, and changing the color accordingly.
const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    alternateStyle.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled", "true");

        }
    });
}

//Sending an email automatically to the interested party and the website owner. 
const btn = document.getElementById('buttonSubmit');

document.getElementById('contactForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'service_g95qduo';
        const templateID = 'template_euhndsu';
        const serviceID1 = 'service_c1psw0t';
        const templateID1 = 'template_ijtzxbd';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('The message was sent successfully!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });


        emailjs.sendForm(serviceID1, templateID1, this)
            .then(() => {
                btn.value = 'Send Email';
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });