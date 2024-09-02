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
  prev_img.src = img;
  prev_img.alt = alt;
  //Getting the button and putting in the new coffee
  document.getElementById("slideButton").onclick = function () { general_showProduct(new_img) };
}

// Slide show dragging code
const SLIDE = document.getElementById("slide");

let dragStart = false;
const isDragStart = () => {
  dragStart = true;
}
const dragging = (e) => {
  console.log(e.pageX);
  if (!isDragStart) return;
  e.preventDeafult();
  SLIDE.scrollLeft = e.pageX;
}
const dragStop = () => { dragStart = false };

// Even listeners for dargging behaviour
SLIDE.addEventListener("mousedown", isDragStart);
SLIDE.addEventListener("mousemove", dragging);
SLIDE.addEventListener("mouseup", dragStop);
/**************************************************************/
// END OF MODULE
/**************************************************************/