/**************************************************************/
// htmlJs_coffee.js
// Code that executes on load in html_coffee.html
/**************************************************************/
MODULENAME = "htmlJs_coffee.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const COFFEE = document.getElementById("header");
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
  //Incrementing the amount of coffee bought
  INCREMENT.addEventListener('click', () => {
    let currentQuantity = parseInt(QUANTITY.value);
    QUANTITY.value = currentQuantity + 1;
  });
  DECREMENT.addEventListener('click', () => {
    let currentQuantity = parseInt(QUANTITY.value);
    //You must order at least one coffee
    if (currentQuantity > 1) {
      QUANTITY.value = currentQuantity - 1;
    }
  });
});

/*************************************************************/
//form_callBack()
//what happens when the user orders coffee
//writes users order details to firebase
//input: data from the form
//Called by form_submit
/*************************************************************/
function form_callBack(data) {
  console.log("form_callBack()");
  let currentOrder = {
    product: COFFEE.innerHTML,
    amount: '',
    size: '',
    price: Number(PRICE.innerHTML),
  };
  fbR_saveSnapshot(data, currentOrder, () => {
    console.log("The user ordered: " + currentOrder);
    fb_writeRec(fbV_CARTPATH, fbV_userDetails.uid, currentOrder, () => {
      //Alerting the user that their order has gone through
      //alert("You have successfully placed an order. Go to the shopping cart if you want to view your order.");
      //Renabling the order button if the user wants to order more
      document.getElementById("submit").disabled = false;
      inputs.forEach((input) => {
        input.disabled = false;
        if (input.type === 'radio' || input.type === 'checkbox') { input.checked = false; }
      });
    });
  });
}