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

//Loading defered styles
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_coffee.css", rel: "stylesheet" });
general_loadDeferLinks();


/**************************************************************/
// function coffee_submit()
// orders the users coffee
// input: amount to order
// called: after user clicks on the order button
/**************************************************************/
function coffee_submit(amount) {
  console.log("coffee_submit()")
  fb_writeRec(fbV_ORDERSPATH)
}