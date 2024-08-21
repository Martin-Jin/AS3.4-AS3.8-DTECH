/**************************************************************/
// firebase_fbR
/**************************************************************/
MODULENAME = "firebase_fbR.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// fbR_procUserLogin(user, save, loginStatus);
// Process user login data
// Input: the user's data and where to save it to
/**************************************************************/
function fbR_procUserLogin(user, save) {
  console.log("fbR_procUserLogin();")
  //Saving the login data
  fbV_loginStatus = 'logged in';
  fbR_saveSnapshot(user, save);

  //Writing login info to database
  fb_writeRec(fbV_LOGINDETAILSPATH, save.uid, save);
  console.log('fbR_login: status = ' + fbV_loginStatus);

  //Changing the html for when users are logged in
  general_checkLogin();
  //Saving login status and details
  manager_saveValues();
  //alert the user they have logged in
  alert("You have successfully logged in.");
  location.reload();
}

/**************************************************************/
// fbR_initialise();
// Called on load
// Initialize firebase
// input: optional callback function
/**************************************************************/
function fbR_initialise(callBack) {
  console.log('%cfb_initialise: ', 'color: brown;');

  var FIREBASECONFIG = {
    apiKey: fbV_APIKEY,
    authDomain: fbV_AUTHDOMAIN,
    databaseURL: fbV_DATABASEURL,
    projectId: fbV_PROJECTID,
    storageBucket: fbV_STORAGEBUCKET,
    messagingSenderId: fbV_MESSAGINGSENDERID,
    appId: fbV_APPID,
    measurementId: fbV_MEASUREMENTID
  };

  //Check if firebase already initialised
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASECONFIG);
    fbV_dataBase = firebase.database();
  }
  //Call callback if given one
  if (callBack != undefined) {
    callBack();
  }
}

/**************************************************************/
// fbR_procGeneral(snapshot, save, callBack);
// Process the read data in general for reads
// Input: the data and loucation to save to, optional callBack function
/**************************************************************/
function fbR_procGeneral(snapshot, save, callBack) {
  console.log("fbR_procGeneral();");
  if (snapshot.val() == null) {
    readStatus = "Not found";
    //Call callback even if theres is nothing to read
    if (callBack != undefined) { callBack(); }
  }
  else {
    readStatus = "OK";
    console.log(snapshot.val());
    let dbData = snapshot.val();
    //Saving snapshot
    fbR_saveSnapshot(dbData, save, callBack);
  }
  console.log('fbR_procGeneral: status = ' + readStatus);
}

/**************************************************************/
// fbR_procOrdersAll(snapshot, save);
// Process the read data of the users orders and then display it
// Input: the data and where to save to
/**************************************************************/
function fbR_procOrdersAll(snapshot, save) {
  console.log("fbR_procOrdersAll();");
  //If nothing read then say cart is empty and do nothing else
  if (snapshot.val() == null) { document.getElementById("cartHeader").innerHTML = `Your cart is empty.`; order_show(false); return; }
  else { document.getElementById("cartHeader").innerHTML = `Shopping cart`; order_show(true) }
  readStatus = "OK";
  save = snapshot.val();
  /**************************************************************/
  // Merging duplicates
  /**************************************************************/
  //Keys of the snapshot will return the coffee name as the key
  let coffeeIds = Object.entries(save).map(([key, value]) => ({ key, value }));
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
      console.log(skip);
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
      if (combineCount>1) {
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
  console.log("Array is " + JSON.stringify(mergedCoffees));
  /**************************************************************/
  // displaying coffee
  /**************************************************************/
  //First clearing the cart thats displayed and also variables
  subtotal = 0;
  while (cart.hasChildNodes()) {
    cart.removeChild(cart.firstChild)
  }
  //Displaying coffee details per each coffee
  mergedCoffees.forEach((coffee) => {
    let details = coffee.value;
    order_displayCart(coffee.key, details);
  });
  order_summary();
  console.log(save);
  console.log('fbR_procOrdersAll: status = ' + readStatus);

  //Updating firebase so duplicate checking won't need to be done again
  //temporarily disabling read on so updating dosen't trigger a cycle of
  //read and write. But only if there were duplicates.
  if (hadDuplicates) {
    order_cartListener.off();
    fb_writeRec(fbV_CARTPATH, fbV_userDetails.uid, '');
    for (i = 0; i < mergedCoffees.length; i++) {
      let coffee = mergedCoffees[i];
      fb_writeRec(fbV_CARTPATH, fbV_userDetails.uid + "/" + coffee.key + "-" + i, coffee.value);
      fb_readOn(order_cartListener, fbV_cartDetails, fbR_procOrdersAll);
    }
  }
}

/**************************************************************/
// fbR_procWriteError(error, callBack)
// Process errors for the write functions if there is one
// Input: error, optional callBack function
// Called after the write is done
/**************************************************************/
function fbR_procWriteError(error, callBack) {
  console.log("fbR_procWriteError();");
  if (error) {
    console.log(error);
    writeStatus = "Failed";
  }
  else {
    writeStatus = "OK";
  }
  console.log('fbR_procWriteError: status = ' + writeStatus);
  //calling call back if given one
  if (callBack != null) { callBack(); }
}

/*************************************************************/
// function fbR_saveSnapshot(snapshot, save, callBack);
// Saves the key value pairs of one object snapshot to another save
// if the key of snapshot is in save
// Called by proc functions to save data
// Input: the object with the data to be saved, where to save it and an optional callback
/*************************************************************/
function fbR_saveSnapshot(snapshot, save, callBack) {
  console.log("fbR_saveSnapshot();");
  //Getting the keys of the object that the snapshop values are saved to
  //Also getting the keys of the snapshot
  //Then compare the array of keys to see which keys match
  //These will be the keys of the values that need to be saved
  let saveKeys = Object.keys(save);
  let snapshotKeys = Object.keys(snapshot);

  //Iterating through all of the save keys
  //For each save key check if is in any of the snapshot keys
  for (x = 0; x < saveKeys.length; x++) {
    let saveKey = saveKeys[x];
    for (i = 0; i < snapshotKeys.length; i++) {
      let snapshotKey = snapshotKeys[i];
      //When they match, save the value
      if (saveKey == snapshotKey) {
        save[saveKey] = snapshot[snapshotKey];
        //console.log(saveKey + " is saved as: " + save[saveKey]);
      };
    }
  }
  if (callBack != null) { callBack(); }
}
/**************************************************************/
// END OF MODULE
/**************************************************************/