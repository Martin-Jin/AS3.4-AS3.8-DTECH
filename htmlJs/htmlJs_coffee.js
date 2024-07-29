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

const INCREMENT = document.getElementById("increment");
const DECREMENT = document.getElementById("decrement");
const QUANTITY = document.getElementById("amount");
/**************************************************************/
// START OF MODULE
/**************************************************************/
general_displayCard();

//Loading defered styles
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_coffee.css", rel: "stylesheet" });
general_loadDeferLinks();

document.addEventListener('DOMContentLoaded', () => {
  //Get the form element
  const form = document.getElementById('formContainer');

  //Prevent the default form submission behavior
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    //Passed validation so allow user to click submit button
    form_valid = true;
  });

  //Incrementing the amount of coffee bought
  INCREMENT.addEventListener('click', () => {
    let currentQuantity = parseInt(QUANTITY.value);
      QUANTITY.value = currentQuantity + 1;
  });
  DECREMENT.addEventListener('click', () => {
    let currentQuantity = parseInt(QUANTITY.value);
    //You must order at least one coffee
    if (currentQuantity > 2) {
      QUANTITY.value = currentQuantity - 1;
    }
  });

  //giving user feedback if what they input is correct in real time
  let inputs = document.querySelectorAll("input");
  //Add an event listener for input
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value != '') {
        if (input.checkValidity()) {
          //Change border to green if is right
          input.style.setProperty("border-color", "#1ae57b", "important");
        } else {
          //Change border to red if is wrong
          input.style.setProperty("border-color", "#ff4444", "important");
        }
      } else {
        //If nothing inputed just leave as deafult
        input.style.setProperty("border-color", "#fbf8f6", "important");
      }
    });
  });
});
/**************************************************************/
// function coffee_submit()
// orders the users coffee
// input: amount to order
// called: after user clicks on the order button
/**************************************************************/
function coffee_submit(amount) {
  console.log("coffee_submit()")
}