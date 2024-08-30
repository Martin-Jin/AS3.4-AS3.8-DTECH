/**************************************************************/
// htmlJs_admin.js
// Code that executes on load in htmlJs_admin.html
/**************************************************************/
MODULENAME = "htmlJs_admin.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const admin_ORDERS = document.getElementById("table")
/**************************************************************/
// START OF MODULE
/**************************************************************/
let admin_readOn = fbV_dataBase.ref(fbV_CHECKOUTPATH);
fb_readOn(admin_readOn, '', admin_displayAll);

function admin_displayAll(snapshot) {
  // tell the admin that there is no orders right now if snapshot is null
  if (snapshot.val() == null) { alert("There are currently no orders."); return };

  // Get all the orders
  let allOrders = Object.entries(snapshot.val()).map(([key, value]) => ({ key, value }));
  // Get all the user details so it can be matched to a users order
  let loginDetails;
  let registrationDetails;
  // Reading user deatils so that their name and address can be displayed
  fb_readRec("userDetails", '', loginDetails, (snapshot) => {
    loginDetails = Object.entries(snapshot.val().loginDetails).map(([key, value]) => ({ key, value }));
    registrationDetails = Object.entries(snapshot.val().registrationDetails).map(([key, value]) => ({ key, value }));
    // After getting login details and registration details display the users order
    allOrders.forEach((userOrder, index) => {
      let uid = userOrder.key;
      let name;
      let address;
      // Find the users name with UID
      loginDetails.forEach((loginDetail, index) => {
        if (loginDetail.key == uid) {
          // Removing the login detail thats already been checked inorder
          name = loginDetail.value.displayName;
          // to save time
          loginDetails.splice(index, 1);
        }
      })
      // Find the users address with UID
      registrationDetails.forEach((registrationDetail) => {
        if (registrationDetail.key == uid) {
          address = registrationDetail.value.street + ", " + registrationDetail.value.suburb + ", " + registrationDetail.value.post + ", " + registrationDetail.value.city;
        }
      })
      userOrder = Object.entries(userOrder.value).map(([key, value]) => ({ key, value }));
      userOrder.forEach((order)=>{
        let row = `
        <tr id="row + ${index} ">
          <td id="img + ${index}"><img src="${order.value.photo}"></td>
          <td id="name + ${index}">${order.key}</td>
          <td id="user + ${index}">${name}</td>
          <td id="size + ${index}">${order.value.size}</td>
          <td id="amount + ${index}">${order.value.amount}</td>
          <td id="address + ${index}">${address}</td>
          <td id="address + ${index}">${order.value.collectionMethod}</td>
        </tr>`
        admin_ORDERS.innerHTML += row;
      })
    })
  })
}