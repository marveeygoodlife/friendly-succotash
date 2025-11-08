"use strict"

document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector('nav ul');
    const ulbtn = document.querySelector('nav button');
    ulbtn.addEventListener("click", () => {
        ul.classList.toggle('active');
    });
});