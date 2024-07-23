/**************************************************************/
// general_general.js
// General HTML js used across all HTML pages
/**************************************************************/
MODULENAME = "general_general.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
//Array of coffee
const coffee1 = { image: '/images/images_coffee/coffee_1.jpg', alt: 'coffee1', price: 3.50, name: 'Latte', about: 'A classic Italian coffee drink. This drink is known for its smooth and velvety texture and its balance of espresso and steamed milk, creating a perfect harmony of flavors.', ingredients: 'Espresso and steamed milk.' };
const coffee2 = { image: '/images/images_coffee/coffee_2.jpg', alt: 'coffee2', price: 4.25, name: 'Cappuccino', about: 'A popular coffee drink with a rich, creamy texture.  The cappuccino features a distinct layer of foamed milk, giving it a beautiful presentation and a light, airy texture.  It is a delightful choice for those who prefer a slightly milder coffee experience with a touch of sweetness.', ingredients: 'Espresso, steamed milk, and foamed milk.' };
const coffee3 = { image: '/images/images_coffee/coffee_3.jpg', alt: 'coffee3', price: 5.00, name: 'Espresso', about: 'A concentrated coffee drink with a bold flavor.  The espresso is a true coffee connoisseur’s choice, delivering a strong and intense coffee experience in a small serving.  It is known for its rich aroma and its ability to awaken the senses with its bold and intense flavor.', ingredients: 'Espresso.' };
const coffee4 = { image: '/images/images_coffee/coffee_4.jpg', alt: 'coffee4', price: 3.75, name: 'Americano', about: 'A coffee drink that is similar to black coffee but with a slightly stronger flavor.  The Americano is a perfect choice for those who enjoy the simplicity of black coffee but crave a slightly more intense flavor.  It is a refreshing and invigorating drink that balances the bold espresso with the clean taste of hot water.', ingredients: 'Espresso and hot water.' };
const coffee5 = { image: '/images/images_coffee/coffee_5.jpg', alt: 'coffee5', price: 4.50, name: 'Mocha', about: 'A coffee drink with a rich chocolate flavor.  The mocha is a decadent and indulgent treat that combines the richness of espresso with the sweetness of chocolate syrup and the creamy texture of steamed milk.  It is a perfect choice for those who crave a sweet and satisfying coffee experience.', ingredients: 'Espresso, chocolate syrup, steamed milk, and whipped cream.' };
const coffee6 = { image: '/images/images_coffee/coffee_6.jpg', alt: 'coffee6', price: 5.25, name: 'Frappuccino', about: 'A refreshing blended iced coffee drink.  The Frappuccino is a perfect choice for those who enjoy a cool and refreshing treat.  It combines the bold flavor of espresso with the sweetness of milk, ice, and flavorings, creating a delightful and satisfying experience.', ingredients: 'Espresso, milk, ice, and flavorings.' };

/**************************************************************/
// START OF MODULE
/**************************************************************/
//Get saved values then check if user is logged in or not
manager_getValues();

/**************************************************************/
// function general_displayCard();
// sets the info for product page of coffee
// called: after user clicks on a coffee product and they are sent
// to the product page
/**************************************************************/
function general_displayCard() {
  console.log("general_displayCard()");
  const JSONSTRING = sessionStorage.getItem("coffee");
  let coffee = JSON.parse(JSONSTRING);
  console.log(coffee);
  //Updating values on coffee page
  COFFEE.innerHTML = coffee.name;
  PRICE.innerHTML = coffee.price;
  IMAGE.src = coffee.image;
  DESCRIPTION.innerHTML = coffee.about;
  INGREDIENTS.innerHTML = coffee.ingredients;
  IMAGE.alt = coffee.alt;
}

/**************************************************************/
// function general_showProduct();
// takes user to the product page
// input: coffee object to show
// called: after user clicks on a coffee product
/**************************************************************/
function general_showProduct(coffee){ 
  console.log("general_showProduct()");
  //Saving the coffee object to session storage, then sending the user to
  //the product page
  sessionStorage.setItem("coffee", JSON.stringify(coffee));
  window.location = "/html/html_coffee.html";
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/