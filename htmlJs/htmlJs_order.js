/**************************************************************/
// htmlJs_order.js
/**************************************************************/
MODULENAME = "htmlJs_order.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
let order_cartListener = fbV_dataBase.ref(fbV_CARTPATH + '/' + fbV_userDetails.uid);
let cart = document.getElementById("cart");
/**************************************************************/
// START OF MODULE
/**************************************************************/
//Reading on users orders, and displaying user order when is triggered
fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);

/*************************************************************/
//order_displayCart()
//displays users order
//input: the coffee to display entires for, and its details
//called by: proc read orders function after each coffee order read
/*************************************************************/
function order_displayCart(coffee, details) {
  console.log("order_displayCart()");
  //Adding in data
  cart.innerHTML += `         
    <order-container>
      <img src="${details.photo}" alt="coffee">
      <h3 class="order_name">${coffee}</h3>
      <p class="order_details">Size: ${details.size} | Qty: ${details.amount}</p>
      <h3 class="order_total">Total: $${details.price * details.amount}</h3>
      <p class=order_price>at $${details.price} each</p>
    </order-container>`
}
