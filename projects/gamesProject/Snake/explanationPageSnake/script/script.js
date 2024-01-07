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