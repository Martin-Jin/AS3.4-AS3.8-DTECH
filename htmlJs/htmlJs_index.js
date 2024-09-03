/**************************************************************/
// htmlJs_index.js
// Code that executes on load in index.html
/**************************************************************/
MODULENAME = "htmlJs_index.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const index_SLIDEIMAGES = [coffee1, coffee2, coffee3, coffee4, coffee5, coffee6];

let index_slideIndex = -1;
/**************************************************************/
// START OF MODULE
/**************************************************************/
//Only add the onclick to login when user loads in and firebase is initialised
//unless user is already is signed in
fbR_initialise(function () {
  if (fbV_loginStatus == "logged in") { return; }
  document.getElementById("signInBtn").onclick = function () { fb_login(fbV_userDetails, fbR_procUserLogin) }
  document.getElementById("dropDownSignIn").onclick = function () { fb_login(fbV_userDetails, fbR_procUserLogin) }
});

/**************************************************************/
// function index_displaySlide();
// Determines what slide to display next when the user clicks
// on the foward or back button
// called when user clicks on foward or back arrow on the slide show
// input: +1 or -1 to increase or decrease the slide show index
/**************************************************************/
function index_displaySlide(index) {
  console.log("index_displaySlide(" + index + ")");
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
  // Chaging the text thats displayed
  document.getElementById("slideAbout").innerHTML = new_img.about;
  document.getElementById("slideItem").innerHTML = new_img.name;
  // Changing images and alt tags
  prev_img.src = img;
  prev_img.alt = alt;
  // Randomising the review
  function generateRandomCoffeeReview() {
    const STARTS = [
      "The coffee is", "This brew is", "The latte is", "The espresso is",
      "The cappuccino is", "The aroma is", "The flavor is", "The taste is",
      "The blend is", "The roast is", "The macchiato is", "The cup of coffee is"
    ];

    const MIDDLES = [
      "great", "good", "decent", "wonderful", "fantastic",
      "amazing", "excellent", "just fine", "very good", "remarkable",
      "pleasant"
    ];

    const ENDS = [
      "because I liked it.",
      "and I would recommend it.", "and I'm satisfied.",
      "and it exceeded my expectations.", "because it was delightful.",
      "and I enjoyed it.", "because it was decent.",
      "and it was worth it.", "and it made my day.", "because it was just right."
    ];

    const START = STARTS[Math.floor(Math.random() * STARTS.length)];
    const MIDDLE = MIDDLES[Math.floor(Math.random() * MIDDLES.length)];
    const END = ENDS[Math.floor(Math.random() * ENDS.length)];

    return `${START} ${MIDDLE}, ${END}`;
  }
  const COFFEEREVIEWS = Array.from({ length: 100 }, generateRandomCoffeeReview);
  const REVIEW = COFFEEREVIEWS[Math.floor(Math.random() * COFFEEREVIEWS.length)];
  document.getElementById("slideQuote").innerHTML = REVIEW
  // Now generating a random name
  function generateRandomName() {
    const FIRST_NAMES = [
      "John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah",
      "David", "Laura", "James", "Megan", "Daniel", "Emma", "Andrew", "Olivia",
      "Joshua", "Sophia", "Matthew", "Isabella", "Ben", "Charlotte", "Ethan",
      "Hannah", "Ryan", "Grace"
    ];

    const LAST_NAMES = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
      "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
      "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
      "Lee", "Perez", "Thompson", "White", "Harris"
    ];

    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    return `${firstName} ${lastName}`;
  }
  const NAMES = Array.from({ length: 100 }, generateRandomName);
  const RANDOM_NAME = NAMES[Math.floor(Math.random() * NAMES.length)];
  document.getElementById("slideName").innerHTML = RANDOM_NAME;
  //Getting the button and putting in the new coffee
  document.getElementById("slideButton").onclick = function () { general_showProduct(new_img) };
}

// Slide show dragging code
const SLIDE = document.getElementById("slide");

let dragStart = false;
let prevPageX, prevScrollLeft, positionDiff;

const isDragStart = (e) => {
  dragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = SLIDE.scrollLeft;
}

const dragging = (e) => {
  // Only start dargging once user has clicked
  if (!dragStart) { return };
  // How much the slide scrolls depends on
  // the difference between the initial mouse position
  // and when the user is dragging it, as well as the original slide position
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  SLIDE.scrollLeft = prevScrollLeft - positionDiff;
}
// Even listeners for dargging behaviour
SLIDE.addEventListener("mousedown", isDragStart);
SLIDE.addEventListener("touchstart", isDragStart);
SLIDE.addEventListener("mousemove", dragging);
SLIDE.addEventListener("touchmove", dragging);
SLIDE.addEventListener("mouseup", () => { dragStart = false });
SLIDE.addEventListener("touchup", () => { dragStart = false });
/**************************************************************/
// END OF MODULE
/**************************************************************/