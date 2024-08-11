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

const TAX = document.getElementById("tax");
const SUBTOTAL = document.getElementById("subtotal");
let subtotal = 0;
const TOTAL = document.getElementById("total");
let total = 0;
const DELIVERY = document.getElementById("delivery");
let delivery = 0;
/**************************************************************/
// START OF MODULE
/**************************************************************/
//Reading on users orders, and displaying user order when is triggered
fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);

//Loading defered styles
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_order.css", rel: "stylesheet" });
general_loadDeferLinks();

//Adding event listener for each radio button
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      if (radio.value == "delivery") {
        delivery = 5;
      }
      else { delivery = 0; }
      order_summary();
    }
  });
});

/*************************************************************/
//order_displayCart()
//displays users order
//input: the coffee to display entires for, and its details
//called by: proc read orders function after each coffee order read
/*************************************************************/
function order_displayCart(coffee, details) {
  console.log("order_displayCart()");
  let coffeeTotal = details.price * details.amount;
  //Adding in data
  cart.innerHTML += `         
    <order-container>
      <img src="${details.photo}" alt="coffee">
      <h3 class="order_name">${coffee}</h3>
      <p class="order_details">Size: ${details.size} | Qty: ${details.amount}</p>
      <h3 class="order_total">Total: $${coffeeTotal}</h3>
      <p class=order_price>at $${details.price} each</p>
    </order-container>`
  //Calculating users total fees
  subtotal += coffeeTotal;
}

/*************************************************************/
//order_summary()
//generates the summary and sums up prices for the user
/*************************************************************/
function order_summary() {
  // console.log("order_summary()");
  SUBTOTAL.innerHTML = "$" + subtotal;
  DELIVERY.innerHTML = "$" + delivery;
  TAX.innerHTML = "$" + ((subtotal + delivery) * 0.15).toFixed(2);
  TOTAL.innerHTML = "$" + ((subtotal + delivery) * 1.15).toFixed(2);
}
