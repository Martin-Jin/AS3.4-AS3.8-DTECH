/**************************************************************/
// htmlJs_coffee.js
// Code that executes on load in html_coffee.html
/**************************************************************/
MODULENAME = "htmlJs_coffee.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const COFFEE = document.getElementById("productHeader");
const PRICE = document.getElementById("productPrice");
const IMAGE = document.getElementById("productImg");
const DESCRIPTION = document.getElementById("description");
const INGREDIENTS = document.getElementById("ingredients");

/**************************************************************/
// START OF MODULE
/**************************************************************/
general_displayCard();