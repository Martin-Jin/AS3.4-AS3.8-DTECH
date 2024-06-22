/**************************************************************/
// htmlJs_index.js
// Code that executes on load in index.html
/**************************************************************/
MODULENAME = "htmlJs_index.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
//Set active page to index.html
general_PAGES_HOME.styling = "active";

const index_MEDIAQUERIES = [{
  mediaQuery: window.matchMedia("(min-width: " + general_MEDIA_QUERY_BREAK_POINT + "px)"), callBack: () => {
    //Clearing the navbar then generating the navbar and the sign in button
    general_clearNav(general_NAVBAR);
    general_generateNav(general_PAGES, general_NAVBAR, '');
    general_generateNav([{ url: '/html/html_signIn', name: 'Sign in', icon: '', 
                          alt: '', id: 'signIn', styling: 'general_signInBtn' }], general_NAVBAR, '');
  }
}];

//Array of images in the slide
const index_SLIDEIMAGES = [{ image: '/images/images_slide/slide_coffee.jpg', alt: 'coffee1' },
                           { image: '/images/images_slide/slide_coffee.jpg', alt: 'coffee2' },
                           { image: '/images/images_slide/slide_coffee.jpg', alt: 'coffee3' }]

let index_slideIndex = -1;
const index_SLIDE_IMAGE_ID = 'index_slideImage';
/**************************************************************/
// START OF MODULE
/**************************************************************/
general_setUpMediaQuery(index_MEDIAQUERIES);

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
  let old_img = document.getElementById(index_SLIDE_IMAGE_ID);
  let img = index_SLIDEIMAGES[index_slideIndex].image;
  let alt = index_SLIDEIMAGES[index_slideIndex].alt;
  old_img.src = img;
  old_img.alt = alt;
}
/**************************************************************/
// END OF MODULE
/**************************************************************/