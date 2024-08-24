/**************************************************************/
// htmlJs_order.js
/**************************************************************/
MODULENAME = "htmlJs_order.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
let order_cartListener = fbV_dataBase.ref(fbV_CARTPATH + '/' + fbV_userDetails.uid);
let order_checkOutListener = fbV_dataBase.ref(fbV_CHECKOUTPATH + '/' + fbV_userDetails.uid);

const TAX = document.getElementById("tax");
const SUBTOTAL = document.getElementById("subtotal");
let subtotal = 0;
const TOTAL = document.getElementById("total");
let total = 0;
const DELIVERY = document.getElementById("delivery");
let delivery = 0;

//Currency format
let currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
/**************************************************************/
// START OF MODULE
/**************************************************************/
//Reading on users orders, and displaying user order when is triggered
fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);
fb_readOn(order_checkOutListener, '', (snapshot)=>{
  if (snapshot.val() == null) {
    document.getElementById("checkOutSection").style.display = "none";
  } else {
    document.getElementById("checkOutSection").style.display = "";
    order_setCoffees("checkOut", snapshot, fbV_CHECKOUTPATH);}
});

//Loading defered styles
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_order.css", rel: "stylesheet" });
general_loadDeferLinks();
//Adding event listener for each radio button
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      document.getElementById("submit").style.display = "block";
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
function order_displayCart(coffee, details, id) {
  console.log("order_displayCart()");
  let coffeeTotal = details.price * details.amount;
  //Adding in data
  document.getElementById(id).innerHTML += `         
    <order-container>
      <img src="${details.photo}" alt="coffee">
      <h3 class="order_name">${coffee}</h3>
      <p class="order_details">Size: ${details.size} | Qty: ${details.amount}</p>
      <h3 class="order_total">Total: ${currency.format(coffeeTotal)}</h3>
      <p class=order_price>${currency.format(details.price)} each</p>
    </order-container>`
  //Calculating users total fees
  subtotal += coffeeTotal;
}

/*************************************************************/
//order_mergeCoffees()
//merges coffees order from snapshot val of a coffee path
//input: the .coffee data and the path is read from
//called by: call back after reading order path or checkout path
/*************************************************************/
function order_mergeCoffees(coffeeData, path) {
  console.log("order_mergeCoffees()");
  let coffeeIds = Object.entries(coffeeData).map(([key, value]) => ({ key, value }));
  //Array that will stored coffees with no ids
  let coffees = [];
  //Function which removes the ids of the coffee
  function removeID(str) {
    const HYPHENINDEX = str.indexOf('-');
    return str.substring(0, HYPHENINDEX);
  }
  //Going through array with ids to remove the ids and put it in
  //array with no ids
  coffeeIds.forEach((coffee) => {
    coffee.key = removeID(coffee.key);
    coffees.push(coffee);
  });
  let skip = false;
  //Duplicates with merged amounts
  let mergedCoffees = [];
  //Stores all of the duplicates found
  let potentialDups = [];
  let hadDuplicates = false;
  //Check for duplicates
  coffees.forEach((coffeeToCheck) => {
    skip = false;
    //Checking if this duplicate has already been checked
    potentialDups.forEach((dup) => {
      if (dup.key == coffeeToCheck.key) { skip = true; }
    });
    if (skip) { return };
    coffees.forEach((coffee) => {
      if (coffee.key == coffeeToCheck.key) {
        //orders of the same coffee
        //but may not be duplicates if users selected a different size
        potentialDups.push(coffee);
      }
    });
  });
  //Indexes to skip as they've been checked
  let skipIndex = [];
  potentialDups.forEach((potential1, index1) => {
    if (!skipIndex.includes(index1)) {
      let duplicatesTemp = [];
      //Create a clone potential as reference type so will just copy
      //address and not value
      //then check if object is equivalent without amount
      //if it is then is a true duplicate
      let clonePotential1 = JSON.parse(JSON.stringify(potential1));
      delete clonePotential1.value.amount;
      potentialDups.forEach((potential2) => {
        let clonePotential2 = JSON.parse(JSON.stringify(potential2));
        delete clonePotential2.value.amount;
        if (JSON.stringify(clonePotential1) == JSON.stringify(clonePotential2)) {
          //Add to duplicates array
          duplicatesTemp.push(potential2);
        }
      });
      //Merge duplicates
      let amount = 0;
      let combineCount = 0;
      duplicatesTemp.forEach((dup) => {
        amount += dup.value.amount;
        combineCount++;
      });
      if (combineCount > 1) {
        hadDuplicates = true;
      }
      //Pushing the merged
      let dupToPush = JSON.parse(JSON.stringify(duplicatesTemp[0]));
      dupToPush.value.amount = amount;
      mergedCoffees.push(dupToPush);
      //Removing these from potential array to be checked
      duplicatesTemp.forEach((dup) => {
        potentialDups.filter((potential, index2) => {
          if (JSON.stringify(dup) == JSON.stringify(potential)) { skipIndex.push(index2); }
        })
      })
    }
  });
  //Updating firebase so duplicate checking won't need to be done again
  //temporarily disabling read on so updating dosen't trigger a cycle of
  //read and write. But only if there were duplicates.
  if (hadDuplicates) {
    order_cartListener.off();
    fb_writeRec(path, fbV_userDetails.uid, '');
    for (i = 0; i < mergedCoffees.length; i++) {
      let coffee = mergedCoffees[i];
      fb_writeRec(path, fbV_userDetails.uid + "/" + coffee.key + "-" + i, coffee.value);
      fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);
    }
  }
  return mergedCoffees;
}

/*************************************************************/
//order_checkOut()
//checks out the users order
//called by: check out button
/*************************************************************/
function order_checkOut() {
  console.log("order_checkOut()")
  let allOrders;
  fb_readRec(fbV_CARTPATH, fbV_userDetails.uid, allOrders, (snapshot) => {
    allOrders = snapshot.val();
    //writing this to check out
    //then Wiping orders
    fb_writeRec(fbV_CHECKOUTPATH, fbV_userDetails.uid, allOrders, () => { fb_writeRec(fbV_CARTPATH, fbV_userDetails.uid, null, ()=>{
      //Renabling the order button if the user wants to checkout more
      document.getElementById("submit").disabled = false;
      inputs.forEach((input) => {
        input.disabled = false;
        if (input.type === 'radio' || input.type === 'checkbox') { input.checked = false; }
      });
    }); });
  })
}

/*************************************************************/
//order_setCoffees()
//sets the details of coffees for user to see
//called as callback on read orders and checkout
//input: snapshot value read, path, and id of where to
//display the coffee
/*************************************************************/
function order_setCoffees(id, snapshot, path) {
  console.log("order_setCoffees()");
  let mergedCoffees = order_mergeCoffees(snapshot.val(), path);
  //First clearing the cart thats displayed and also variables
  subtotal = 0;
  let cart = document.getElementById(id);
  while (cart.hasChildNodes()) {
    cart.removeChild(cart.firstChild)
  }
  //Displaying coffee details per each coffee
  mergedCoffees.forEach((coffee) => {
    let details = coffee.value;
    order_displayCart(coffee.key, details, id);
  });
}

/*************************************************************/
//order_summary()
//generates the summary and sums up prices for the user
/*************************************************************/
function order_summary() {
  console.log("order_summary()");
  SUBTOTAL.innerHTML = currency.format(subtotal);
  DELIVERY.innerHTML = currency.format(delivery);
  TAX.innerHTML = currency.format((subtotal + delivery) * 0.15);
  TOTAL.innerHTML = currency.format((subtotal + delivery) * 1.15);
}

/*************************************************************/
//order_show()
//displays or hides user orders depending on if users have orders in their cart
//input: true or false
/*************************************************************/
function order_show(show) {
  console.log("order_show(" + show + ")");
  let display = "none"
  document.getElementById("cartSection").style.gap = '0';
  if (show) {
    display = '';
    document.getElementById("cartSection").style.gap = 'var(--formPadding)';
  };
  let elements = ["cart", "summary", "deliveryOptions", "submit"];
  elements.forEach((element) => {
    document.getElementById(element).style.display = display;
  })
}

function form_callBack() {
  console.log("form_callBack()");
  order_checkOut();
}

