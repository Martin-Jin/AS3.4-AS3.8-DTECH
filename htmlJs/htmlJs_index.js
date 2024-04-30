/**************************************************************/
// htmlJs_index.js
// Code that executes on load in index.html
/**************************************************************/
MODULENAME = "htmlJs_index.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const index_MEDIAQUERIES = [{mediaQuery: window.matchMedia("(min-width: " + general_MEDIA_QUERY_BREAK_POINT + "px)"), callBack: ()=> {general_generateNav(general_PAGES, general_NAVBAR);}}];

/**************************************************************/
// START OF MODULE
/**************************************************************/
htmlJs_setUpMediaQuery(index_MEDIAQUERIES);
/**************************************************************/
// END OF MODULE
/**************************************************************/