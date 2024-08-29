/**************************************************************/
// htmlJs_admin.js
// Code that executes on load in htmlJs_admin.html
/**************************************************************/
MODULENAME = "htmlJs_admin.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const admin_ORDERS = document.getElementById("orders");
const COFFEE_COL = document.getElementById("coffee");
const UID_COL = document.getElementById("uid");
const NAME_COL = document.getElementById("name");
const ADDRESS_COL = document.getElementById("address");

/**************************************************************/
// START OF MODULE
/**************************************************************/
function admin_displayAll(snapshot) {
  //Get all the orders
  let allOrders = Object.entries(snapshot.val()).map(([key, value]) => ({ key, value }));
  //Get all the user details so it can be matched to a users order
  let loginDetails;
  let registrationDetails;
  fb_readRec("userDetails", '', loginDetails, (snapshot) => {
    loginDetails = Object.entries(snapshot.val().loginDetails).map(([key, value]) => ({ key, value }));
    registrationDetails = Object.entries(snapshot.val().registrationDetails).map(([key, value]) => ({ key, value }));
  })
  allOrders.forEach((order) => {
    let uid = order.key;
    let name;
    let address;
    //Find the users name with UID
    loginDetails.forEach((loginDetail, index) => {
      if (loginDetail.key == uid) {
        // Removing the login detail thats already been checked inorder
        name = loginDetail.value.displayName;
        // to save time
        loginDetails.splice(index, 1);
      }
    })
    //Find the users address with UID
    registrationDetails.forEach((registrationDetail) => {
      if (registrationDetail.key == uid) {
        address = registrationDetail.value.street + ", " + registrationDetail.value.suburb + ", " + registrationDetail.value.post + ", " + registrationDetail.value.city;
      }
    })
    NAME_COL.innerHTML += name;
    ADDRESS_COL.innerHTML += address;
  })
}