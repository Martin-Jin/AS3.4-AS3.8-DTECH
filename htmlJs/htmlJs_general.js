/**************************************************************/
// index_general.js
// General HTML js used across all HTML pages
/**************************************************************/
MODULENAME = "index_general.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
//Contains the pages to be generated on the navBar
// const general_PAGES_HOME = 
// { url: '/../index.html', name: 'Home', icon: '/images/images_icons/icons_coffee.png', 
//  alt: 'coffee_icon', id: 'home', styling: '' };
// const general_PAGES_ABOUT_US =
// { url: '/../index.html', name: 'About us', icon: '/images/images_icons/icons_about.png', 
//  alt: 'info_icon', id: 'aboutUs', styling: ''  };
// const general_PAGES_CONTACT_US =
// { url: '/html/html_contact', name: 'Contact us', icon: '/images/images_icons/icons_contact.png', 
//  alt: 'phone_icon', id: 'contactUs', styling: ''  };
// const general_PAGES_PRODUCTS =
// { url: '/html/html_products', name: 'Products', icon: '/images/images_icons/icons_products.png', 
//  alt:'coffee_icon', id: 'products', styling: ''  };
// const general_PAGES_ORDERS =
// { url: '/html/html_orders', name: 'Orders', icon: '/images/images_icons/icons_orders.png', 
//  alt: 'basket_icon', id: 'orders', styling: ''  };
// const general_PAGES = [general_PAGES_HOME, general_PAGES_ABOUT_US, general_PAGES_CONTACT_US, general_PAGES_PRODUCTS, general_PAGES_ORDERS];

// //The media query break point where the device is considered no longer a desktop
// const general_MEDIA_QUERY_BREAK_POINT = 1350;
// //Mobile by deafult, set to true when break point triggered
// let general_mobile = true;

// //The html navbar element
// const general_NAVBAR = document.getElementById("navBar");

// /**************************************************************/
// // START OF MODULE
// /**************************************************************/

// //Collapsing nav on load for mobile
// general_collapseNav();

// /**************************************************************/
// // function general_generateNav(navElements, navBar, styling);
// // generates a navbar by appending buttons to a given id
// // Input: array of objects that have the url and name of the page, and the navBar element
// // also optional styling parameter to add any extra classes
// // Called by multiple functions to generate navBar buttons for navBar and also drop down menu
// /**************************************************************/
// function general_generateNav(navElements, navBar, styling) {
//   //console.log("general_generateNav();");
//   //Iterating through all an array of objects which contain the name of the page and the url
//   //This is then displayed on the navBar
//   for (i = 0; i < navElements.length; i++) {
//     let page = navElements[i];
//     //Giving the button any general classes given, as well as any classes just for the button
//     let classes = styling + page.styling;
    
//     //If given an icon then put it in the button
//     if (page.icon != '') {img = `<img src='${page.icon}' 
//     alt='${page.alt}' class='general_icon'>`} else {img = ``;}
    
//     //Creating the button to go on the navbar
//     let button =
//       `<button onclick="(function() { window.location = '${page.url}' })()" 
//     class='${classes}' id='${page.id}'>
//     ${page.name} ${img}
//     </button>`;
//     navBar.innerHTML += button;
//   }
// }

// /**************************************************************/
// // function general_clearNav(navBar);
// // clears a given navBar
// /**************************************************************/
// function general_clearNav(navBar) {
//   //console.log("general_clearNav();");
//   navBar.innerHTML = "";
// }

// /**************************************************************/
// // function general_mediaQuery(mediaQueryListObject, callBack);
// // Checks if user is on mobile or desktop when media query is triggered
// // Input: the media query to check, and the call back to call when it is
// // Called by general_setUpMediaQuery();
// /**************************************************************/
// function general_mediaQuery(mediaQueryListObject, callBack) {
//   //console.log("general_mediaQuery();");
//   //If mediaQuery matches then call the call back and set mobile to false as user on desktop
//   if (mediaQueryListObject.matches) {
//     callBack();
//     general_mobile = false;
//     //Other wise collapse navBar since user is on mobile
//   } else { general_mobile = true; general_collapseNav(); }
// }

// /**************************************************************/
// // function general_collapseNav();
// // Collapses navBar into a three bar menu and home page
// // Called as a callback by general_mediaQuery when the screen becomes small
// /**************************************************************/
// function general_collapseNav() {
//   //If user on desktop don't collapse navBar
//   if (general_mobile === false) { return; }
//   //console.log("general_collapseNav();");
//   //Regenerating the navbar so that there is only the home button
//   general_clearNav(general_NAVBAR);
//   general_generateNav([general_PAGES[0]], general_NAVBAR, '');
//   //Adding drop down button to navBar
//   general_NAVBAR.innerHTML +=
//     `<div class="general_dropDown">
//     <button onclick="(function() { document.getElementById('dropDown').classList.toggle('show'); })()" 
//       id="general_dropBtn" class="aleo-general">
//         Dropdown
//       </button>
//       <div id="dropDown" class="general_dropDown_content">
//       </div>
//     </div>`
//   //Generating all the buttons inside the drop down menu other than the home page
//   general_generateNav(general_PAGES.slice(1, general_PAGES.length + 1), document.getElementById("dropDown"), '');
//   //Close the dropdown menu if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('#general_dropBtn')) {
//       let dropDowns = document.getElementsByClassName("general_dropDown_content");
//       for (i = 0; i < dropDowns.length; i++) {
//         let openDropdown = dropDowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// }

// /**************************************************************/
// // function general_setUpMediaQuery();
// // Sets up all the necessary media queries necessary for a page
// // Called on load at each page
// /**************************************************************/
// function general_setUpMediaQuery(mediaQueries) {
//   //console.log("general_setUpMediaQuery();");
//   for (i = 0; i < mediaQueries.length; i++) {
//     let mediaQuery = mediaQueries[i].mediaQuery;
//     let callBack = mediaQueries[i].callBack;
//     mediaQuery.addEventListener("change", () => {
//       general_mediaQuery(mediaQuery, callBack);
//     });
//     //Calling the function right away so if the user loads into the page on a desktop
//     //it will trigger the media query
//     //Other wise media query won't be triggered until the user changes tab size
//     //Since the listener listens for the media query to be triggered
//     general_mediaQuery(mediaQuery, callBack);
//   }
// }
// /**************************************************************/
// //    END OF MODULE
// /**************************************************************/