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
fb_readOn(order_checkOutListener, '', (snapshot) => {
  if (snapshot.val() == null) {
    document.getElementById("checkOutSection").style.display = "none";
  } else {
    document.getElementById("checkOutSection").style.display = "";
    order_setCoffees("checkOut", snapshot, fbV_CHECKOUTPATH);
  }
});

//Loading defered styles
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_order.css", rel: "stylesheet" });
general_loadDeferLinks();
//Adding event listener for each radio button
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      document.getElementById("submit").style.display = "block";
      if (radio.value == "Delivery") {
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
  //Display different details if is in checkout section
  if (details.collectionMethod != null) {
    //Adding in data
    document.getElementById(id).innerHTML += `         
      <order-container>
        <img src="${details.photo}" alt="coffee">
        <h3 class="order_name">${coffee}</h3>
        <p class="order_details">Size: ${details.size} | Qty: ${details.amount}</p>
        <h3 class="order_total">Status: ${details.status}</h3>
        <p class=order_price>Collection method: ${details.collectionMethod}</p>
      </order-container>`
  } else {
    //Adding in data
    document.getElementById(id).innerHTML += `         
    <order-container>
      <img src="${details.photo}" alt="coffee">
      <h3 class="order_name">${coffee}</h3>
      <p class="order_details">Size: ${details.size} | Qty: ${details.amount}</p>
      <h3 class="order_total">Total: ${currency.format(coffeeTotal)}</h3>
      <p class=order_price>${currency.format(details.price)} each</p>
    </order-container>`
    // Only calculate subtotal if the order hasen't been checked out
    // other wise displaying checkout orders mess with the summary
    subtotal += coffeeTotal;
  }
}

/*************************************************************/
//order_mergeCoffees()
//merges coffees order from snapshot val of a coffee path
//input: the .coffee data and the path is read from
//called by: call back after reading order path or checkout path
/*************************************************************/
let hadDuplicates;
function order_mergeCoffees(coffeeData, path) {
  hadDuplicates = false;
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
  //Duplicates with merged amounts
  let mergedCoffees = [];
  //Indexes to skip as they've been checked
  let skipIndex = [];
  //check for dupliactes between coffees
  coffees.forEach((potential1, index1) => {
    if (!skipIndex.includes(index1)) {
      let duplicatesTemp = [];
      //Create a clone potential as reference type so will just copy
      //address and not value
      //then check if object is equivalent without amount
      //if it is then is a true duplicate
      let clonePotential1 = JSON.parse(JSON.stringify(potential1));
      delete clonePotential1.value.amount;
      coffees.forEach((potential2) => {
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
      //Pushing to the merged array
      let dupToPush = JSON.parse(JSON.stringify(duplicatesTemp[0]));
      dupToPush.value.amount = amount;
      mergedCoffees.push(dupToPush);
      //Removing these from potential array to be checked
      duplicatesTemp.forEach((dup) => {
        coffees.forEach((potential, index2) => {
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
    }

    fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);
  }
  console.log(mergedCoffees);
  return mergedCoffees;
}

/*************************************************************/
//order_checkOut()
//checks out the users order
//called by: check out button
//input: value of collection method by user
/*************************************************************/
function order_checkOut(data) {
  //Turning off read on for checkout temporarily to not mess with updating the checkout
  order_checkOutListener.off();
  console.log("order_checkOut()")
  let allOrders;
  let allCheckOut;
  //Get all the already checked out items
  fb_readRec(fbV_CHECKOUTPATH, fbV_userDetails.uid, allCheckOut, (snapshot) => {
    //converts object to an array of objects if there are checked out items
    allCheckOut = snapshot.val();
    if (allCheckOut != null) {
      allCheckOut = Object.entries(snapshot.val()).map(([key, value]) => ({ key, value }));
      console.log(JSON.stringify(allCheckOut));
    }
    //Get all the items in the cart
    fb_readRec(fbV_CARTPATH, fbV_userDetails.uid, allOrders, (snapshot) => {
      //converts object to an array of objects
      allOrders = Object.entries(snapshot.val()).map(([key, value]) => ({ key, value }));
      console.log(JSON.stringify(allOrders));
      //Add the two arrays together then merging duplicates
      let updatedCheckOuts = {};
      allOrders.forEach((order) => {
        //Adding in the delivery options that the user chose
        order.value.collectionMethod = data.collectionMethod;
        order.value.status = "Not ready";
        updatedCheckOuts[order.key + Math.random()] = order.value
      });
      if (allCheckOut != null) {
        allCheckOut.forEach((checkout) => { updatedCheckOuts[checkout.key + Math.random()] = checkout.value });
      }
      console.log("The added together array is: " + JSON.stringify(updatedCheckOuts));
      updatedCheckOuts = order_mergeCoffees(updatedCheckOuts, fbV_CHECKOUTPATH)
      //If there are no duplicates need to manually update firebase
      //only when there are duplicates does the merge function automatically do this 
      if (!hadDuplicates) {
        let allCoffee = {};
        for (i = 0; i < updatedCheckOuts.length; i++) {
          console.log(updatedCheckOuts);
          let coffee = updatedCheckOuts[i];
          allCoffee[coffee.key + "-" + i] = coffee.value;
        }
        fb_writeRec(fbV_CHECKOUTPATH, fbV_userDetails.uid + "/", allCoffee);
      }
      fb_writeRec(fbV_CARTPATH, fbV_userDetails.uid, null, () => {
        //Renabling the order button if the user wants to checkout more
        document.getElementById("submit").disabled = false;
        inputs.forEach((input) => {
          input.disabled = false;
          if (input.type === 'radio' || input.type === 'checkbox') { input.checked = false; }
        });
        //Turning on read on again
        fb_readOn(order_checkOutListener, '', (snapshot) => {
          if (snapshot.val() == null) {
            document.getElementById("checkOutSection").style.display = "none";
          } else {
            document.getElementById("checkOutSection").style.display = "";
            order_setCoffees("checkOut", snapshot, fbV_CHECKOUTPATH);
          }
        });
      })

    })
  });

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

function form_callBack(data) {
  console.log("form_callBack()");
  order_checkOut(data);
}

