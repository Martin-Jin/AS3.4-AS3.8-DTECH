/**************************************************************/
// htmlJs_index.js
// Code that executes on load in index.html
/**************************************************************/
MODULENAME = "htmlJs_index.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
//Array of images in the slide
const coffee1 = { image: '/images/images_coffee/coffee_1.jpg', alt: 'coffee1', price: 3.50, name: 'latte', about: 'A classic Italian coffee drink. This drink is known for its smooth and velvety texture and its balance of espresso and steamed milk, creating a perfect harmony of flavors.', ingredients: 'Espresso and steamed milk.' };
const coffee2 = { image: '/images/images_coffee/coffee_2.jpg', alt: 'coffee2', price: 4.25, name: 'cappuccino', about: 'A popular coffee drink with a rich, creamy texture.  The cappuccino features a distinct layer of foamed milk, giving it a beautiful presentation and a light, airy texture.  It is a delightful choice for those who prefer a slightly milder coffee experience with a touch of sweetness.', ingredients: 'Espresso, steamed milk, and foamed milk.' };
const coffee3 = { image: '/images/images_coffee/coffee_3.jpg', alt: 'coffee3', price: 5.00, name: 'espresso', about: 'A concentrated coffee drink with a bold flavor.  The espresso is a true coffee connoisseur’s choice, delivering a strong and intense coffee experience in a small serving.  It is known for its rich aroma and its ability to awaken the senses with its bold and intense flavor.', ingredients: 'Espresso.' };
const coffee4 = { image: '/images/images_coffee/coffee_4.jpg', alt: 'coffee4', price: 3.75, name: 'americano', about: 'A coffee drink that is similar to black coffee but with a slightly stronger flavor.  The Americano is a perfect choice for those who enjoy the simplicity of black coffee but crave a slightly more intense flavor.  It is a refreshing and invigorating drink that balances the bold espresso with the clean taste of hot water.', ingredients: 'Espresso and hot water.' };
const coffee5 = { image: '/images/images_coffee/coffee_5.jpg', alt: 'coffee5', price: 4.50, name: 'mocha', about: 'A coffee drink with a rich chocolate flavor.  The mocha is a decadent and indulgent treat that combines the richness of espresso with the sweetness of chocolate syrup and the creamy texture of steamed milk.  It is a perfect choice for those who crave a sweet and satisfying coffee experience.', ingredients: 'Espresso, chocolate syrup, steamed milk, and whipped cream.' };
const coffee6 = { image: '/images/images_coffee/coffee_6.jpg', alt: 'coffee6', price: 5.25, name: 'frappuccino', about: 'A refreshing blended iced coffee drink.  The Frappuccino is a perfect choice for those who enjoy a cool and refreshing treat.  It combines the bold flavor of espresso with the sweetness of milk, ice, and flavorings, creating a delightful and satisfying experience.', ingredients: 'Espresso, milk, ice, and flavorings.' };

const index_SLIDEIMAGES = [coffee1, coffee2, coffee3, coffee4, coffee5, coffee6];

let index_slideIndex = -1;
/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// function index_displaySlide();
// Determines what slide to display next when the user clicks
// on the foward or back button
// called when user clicks on foward or back arrow on the slide show
// input: +1 or -1 to increase or decrease the slide show index
/**************************************************************/
function index_displaySlide(index) {
  console.log("index_displaySlide(" + index + ");");
  //Determining what slide to display next
  index_slideIndex += index;
  //When slide goes past 0 or the max length of the amount of images,
  //change the index accordingly
  if (index_slideIndex < 0) { index_slideIndex = index_SLIDEIMAGES.length - 1; }
  else if (index_slideIndex > index_SLIDEIMAGES.length - 1) { index_slideIndex = 0; };
  console.log("SlideIndex: " + index_slideIndex);
  //Displaying the next slide
  let prev_img = document.getElementById('slideImage');
  let new_img = index_SLIDEIMAGES[index_slideIndex];
  let img = new_img.image;
  let alt = new_img.alt;
  prev_img.src = img;
  prev_img.alt = alt;
  //Getting the button
  document.getElementById("slideButton").onclick = function () {general_displayCard(new_img)};
}
/**************************************************************/
// END OF MODULE
/**************************************************************/