/**************************************************************/
// htmlJs_cssGrid.js
// Javascript for the css grid html page
/**************************************************************/
MODULENAME = "htmlJs_cssGrid.js";
console.log('%c' + MODULENAME + ': ', 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const cssGrid_AMOUNT = 5;

/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// function cssGrid_generateContainers();
// Generates conatainers for css grid
// Called when users clicks order button after logging in
/**************************************************************/
function cssGrid_generateContainers() {
  console.log("cssGrid_generateContainers();");
  //Getting the grid container
  let gridContainer = document.getElementById("gridContainer");
  for (i=1; i <= cssGrid_AMOUNT; i++) {
    //Creating the container class to put in each container
    let containerClass = "container" + i;
    let row = `<div class="cssGrid_container ${containerClass}">
      <h3 class="aleo-general">${i}</h3>
    </div>`
    gridContainer.innerHTML += row;
  }
}
/**************************************************************/
// END OF MODULE
/**************************************************************/