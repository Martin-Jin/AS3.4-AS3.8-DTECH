/**************************************************************/
// htmlJs_admin.js
// Code that executes on load in htmlJs_admin.html
/**************************************************************/
MODULENAME = "htmlJs_admin.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const admin_ORDERS = document.getElementById("orders")
const admin_READY = document.getElementById("readyOrders")
/**************************************************************/
// START OF MODULE
/**************************************************************/
let admin_readOn = fbV_dataBase.ref(fbV_CHECKOUTPATH);
fb_readOn(admin_readOn, '', admin_displayAll);

// displays all checked out orders
// takes in snapshot of all checked out orders
// called by admin read on
function admin_displayAll(snapshot) {
  // first clear the tables
  admin_ORDERS.innerHTML = `
          <tr id="categories">
          <th>Coffee image</th>
          <th>Coffee name</th>
          <th>User</th>
          <th>Size</th>
          <th>Amount</th>
          <th>Address</th>
          <th>collectionMethod</th>
          <th>Status (tick to clear and let user know is ready)</th>
        </tr>`;
  admin_READY.innerHTML = ` 
         <tr id="categories">
          <th>Coffee image</th>
          <th>Coffee name</th>
          <th>User</th>
          <th>Size</th>
          <th>Amount</th>
          <th>Address</th>
          <th>collectionMethod</th>
          <th>Delete order</th>
        </tr>`;
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
      userOrder.forEach((order) => {
        // Display orders that are not ready
        if (order.value.status != "Ready") {
          console.log(order);
          let row = `
        <tr id="${"row" + index}">
          <td id="${"img" + index}"><img src="${order.value.photo}"></td>
          <td id="${"order id" + index}">${order.key}</td>
          <td id="${"user" + index}">${name}</td>
          <td id=" ${"size" + index}">${order.value.size}</td>
          <td id=" ${"size" + index}">${order.value.amount}</td>
          <td id=" ${"address" + index}">${address}</td>
          <td id="${"collectionMethod" + index}">${order.value.collectionMethod}</td>
          <td id="${"readyBtn" + index}"><i class="admin_button fa-solid fa-check" aria-hidden="true" onclick='admin_confirmOrder("${uid}", "${order.key}")'></i></td>
        </tr>`
          admin_ORDERS.innerHTML += row;
        }
        // Orders that are ready and can be deleted when given to the users
        else {
          console.log(order);
          let row = `
        <tr id="${"row" + index}">
          <td id="${"img" + index}"><img src="${order.value.photo}"></td>
          <td id="${"order id" + index}">${order.key}</td>
          <td id="${"user" + index}">${name}</td>
          <td id=" ${"size" + index}">${order.value.size}</td>
          <td id=" ${"size" + index}">${order.value.amount}</td>
          <td id=" ${"address" + index}">${address}</td>
          <td id="${"collectionMethod" + index}">${order.value.collectionMethod}</td>
          <td id="${"readyBtn" + index}"><i class="admin_button fa-solid fa-xmark" aria-hidden="true" onclick='admin_deleteOrder("${uid}", "${order.key}")'></i></td>
        </tr>`
          admin_READY.innerHTML += row;
        }
      })
    })
  })
}

// Clears the order from admin page and sets order status to ready on users side
// input: the users uid and their order id 
// called by the tick button on admin page
function admin_confirmOrder(UID, orderID) {
  console.log("admin_confirmOrder()");
  fb_writeRec(fbV_CHECKOUTPATH, UID + "/" + orderID + "/status", "Ready");
};

// Removes the order
// input: the users uid and their order id 
// called by the cross button on admin page
function admin_deleteOrder(UID, orderID) {
  console.log("admin_deleteOrder()");
  fb_writeRec(fbV_CHECKOUTPATH, UID + "/" + orderID, null);
}