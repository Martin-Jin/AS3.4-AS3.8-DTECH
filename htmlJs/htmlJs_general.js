/**************************************************************/
// general_general.js
// General HTML js used across all HTML pages
/**************************************************************/
MODULENAME = "general_general.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/


/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// function general_displayCard();
// sets the info for product page of coffee
// input: coffee object
// called: after user clicks on a coffee product and they are sent
// to the product page
/**************************************************************/
function general_displayCard(coffee) {
  console.log("general_displayCard();");
  
}

/**************************************************************/
// function general_showProduct();
// takes user to the product page
// called: after user clicks on a coffee product
/**************************************************************/
function general_showProduct(){ 
  console.log("general_showProduct();");
  //Saving the coffee object to session storage, then sending the user to
  //the product page
  sessionStorage.setItem("coffee", JSON.stringify(coffee));
  window.location = "/html/html_product_coffee.html";
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/