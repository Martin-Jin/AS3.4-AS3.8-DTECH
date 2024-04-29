/**************************************************************/
// htmlJs_general.js
// General HTML js used across all HTML pages
/**************************************************************/
MODULENAME = "htmlJs_general.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
// Contains the pages to be generated on the navBar
const general_PAGES = [{url: '/../index.html', name: 'Home'}, 
{url: '/html/html_mediaQueries.html', name: 'Media Queries'},
{url: '/html/html_cssGrid.html', name: 'CSS grid'},
{url: '/html/html_dataBase.html', name: 'Database'}
];

//The media query break point where the device is considered no longer a computer
const general_MEDIA_QUERY_BREAK_POINT = 1200;
//Mobile by deafult, set to true when break point triggered
var general_mobile = true;

//The html navbar element
const general_NAVBAR = document.getElementById("navBar");

// Contains all media queries for the media query page
// First element is the url of the page, so it can be checked which array to set up the media query for
const general_MEDIA_QUERY_QURERIES = ['/html/html_mediaQueries.html', 
  {mediaQuery: window.matchMedia("(min-width: " + general_MEDIA_QUERY_BREAK_POINT + "px)"), callBack: ()=> {general_generateNav(general_PAGES, general_NAVBAR);}},
]

// Contains all arrays of media queries
const general_MEDIA_QUERIES = [general_MEDIA_QUERY_QURERIES];

/**************************************************************/
// START OF MODULE
/**************************************************************/

//Initialising firebase on load
if (window.location.href === 'https://jvyoappjjl-2362147004-a.codehs.me/html/html_dataBase.html') {fbR_initialise();}

/**************************************************************/
// function general_generateNav(navElements, navBar);
// generates a navbar
// Input: array of objects that have the url and name of the page, and the navBar element
// Called by multiple functions to generate navBar buttons for navBar and also drop down menu
/**************************************************************/
function general_generateNav(navElements, navBar) {
  //console.log("general_generateNav();");
  //Clearing the navBar before generating it
  navBar.innerHTML = ``;
  //Iterating through all an array of objects which contain the name of the page and the url
  //This is then displayed on the navBar
  for (i = 0; i < navElements.length; i++) {
  let page = navElements[i];
  let classes = "aleo-general";
  //If the the href of the users page includes the pages url, that must be the page the users is on
  //Also specifically check for index.html because url for Flex box page is not exactly index.html
  if (window.location.href.includes(page.url) || window.location.href.includes(page.url.replace('/../', '')))
  //Put an under line of the page the user is on
  {classes = "aleo-general active";};
  let button = `<button onclick="(function() { window.location = '${page.url}' })()" class='${classes}'>${page.name}</button>`;
  navBar.innerHTML += button;
  }
}

/**************************************************************/
// function htmlJs_mediaQuery(mediaQueryListObject, callBack);
// Checks if user is on mobile or desktop when media query is triggered
// Input: the media query to check, and the call back to call when it is
// Called by htmlJs_setUpMediaQuery();
/**************************************************************/
function htmlJs_mediaQuery(mediaQueryListObject, callBack) {
  //console.log("htmlJs_mediaQuery();");
  //If mediaQuery matches then call the call back and set mobile to false as user on desktop
  if (mediaQueryListObject.matches) {
    callBack();
    general_mobile = false;
    //Other wise collapse navBar since user is on mobile
  } else {general_mobile = true; htmlJs_collapseNav();}
}

/**************************************************************/
// function htmlJs_collapseNav();
// Collapses navBar into a three bar menu and home page
// Called as a callback by htmlJs_mediaQuery when the screen becomes small
/**************************************************************/
function htmlJs_collapseNav() {
  //If user on desktop don't collapse navBar
  if (general_mobile === false) {return;}
  console.log("htmlJs_collapseNav();");
  //Regenerating the navbar so that there is only the home button
  general_generateNav([general_PAGES[0]], general_NAVBAR);
  //Adding drop down button to navBar
  general_NAVBAR.innerHTML +=
  `<div class="mediaQueries_dropDown">
    <button onclick="(function() { document.getElementById('dropDown').classList.toggle('show'); })()" 
      id="mediaQueries_dropBtn" class="aleo-general">
        Dropdown
      </button>
      <div id="dropDown" class="mediaQueries_dropDown-content">
      </div>
    </div>`
  //Generating all the buttons inside the drop down menu other than the home page
  general_generateNav(general_PAGES.slice(1, general_PAGES.length + 1), document.getElementById("dropDown"));
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('#mediaQueries_dropBtn')) {
      let dropDowns = document.getElementsByClassName("mediaQueries_dropDown-content");
      for (i = 0; i < dropDowns.length; i++) {
        let openDropdown = dropDowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
}

/**************************************************************/
// function htmlJs_setUpMediaQuery();
// Sets up all the necessary media queries necessary for a page
// Called on load at each page
/**************************************************************/
function htmlJs_setUpMediaQuery() {
  console.log("htmlJs_setUpMediaQuery();");
  for (i = 0; i < general_MEDIA_QUERIES.length; i++) {
    //Going through every single media query array
    //If the first elemnt in a media query array matches the page url
    //Those must be the media queries to be used for the page the user is on
    if (window.location.href.includes((general_MEDIA_QUERIES[i])[0])) {
      let mediaQueries = general_MEDIA_QUERIES[i];
      //Going through the media queries that need to be set up
      //Starting at 1 as the first entry is the page url and not a media query
      for (x = 1; x < mediaQueries.length; x++) {
        //Listening for a change in screen size, and call a callback function when it 
        //reaches that specified breaking point
        let mediaQuery = mediaQueries[x].mediaQuery;
        let callBack = mediaQueries[x].callBack;
        mediaQuery.addEventListener("change", ()=> {
          htmlJs_mediaQuery(mediaQuery, callBack);
        }); 
        //Calling the function right away so if the user loads into the page on a desktop
        //it will trigger the media query
        //Other wise media query won't be triggered until the user changes tab size
        //Since the listener listens for the media query to be triggered
        htmlJs_mediaQuery(mediaQuery, callBack);
      }
      //Returning out of the function to save resources and not check other
      //arrays
      return;
    }
  }
}
/**************************************************************/
// END OF MODULE
/**************************************************************/