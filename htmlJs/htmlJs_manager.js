/**************************************************************/
// htmlJs_manager.js
// Js code that manages data across html pages
/**************************************************************/
MODULENAME = "htmlJs_manager.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
const manager_SAVEOBJECTS = [fbV_userDetails, fbV_registerDetails];

/**************************************************************/
// START OF MODULE
/**************************************************************/

/*************************************************************/
//manager_saveValues()
//Saves values to session storage
//Called by multiple functions
/*************************************************************/
function manager_saveValues() {
  console.log("manager_saveValues()");

  //Saving the user statuses.
  sessionStorage.setItem("loginStatus", fbV_loginStatus);
  sessionStorage.setItem("adminStatus", fbV_adminStatus);
  sessionStorage.setItem("registerStatus", fbV_registerStatus);

  for (i = 0; i < manager_SAVEOBJECTS.length; i++) {
    let object = manager_SAVEOBJECTS[i];

    //Creating arrays of key value pairs to save to session storage
    let objecKeys = Object.keys(object);
    let objectValues = Object.values(object);

    //Saving values to session storage{
    for (x = 0; x < objecKeys.length; x++) {
      if (objectValues[x] !== '' && objectValues[x] !== null && objectValues[x] !== undefined) {
        sessionStorage.setItem(objecKeys[x], objectValues[x]);
        /*console.log('%c'
        + "key: "
        + objecKeys[x]
        + " \nvalue saved: "
        + sessionStorage.getItem(objecKeys[x]), 'color: red;');*/
      }
    }
  }
}

/*************************************************************/
//manager_getValues()
//Gets values from session storage
//Called by multiple functions
/*************************************************************/
function manager_getValues() {
  console.log("manager_getValues()");

  //Getting the user statuses if is not null.
  if (sessionStorage.getItem("loginStatus") != null) {
    fbV_loginStatus = sessionStorage.getItem("loginStatus");
    fbV_adminStatus = sessionStorage.getItem("adminStatus");
    fbV_registerStatus = sessionStorage.getItem("registerStatus");
  }

  //Getting the keys of the objects to iterate through and get the values from session storage
  for (i = 0; i < manager_SAVEOBJECTS.length; i++) {
    let object = manager_SAVEOBJECTS[i];

    //Creating arrays of keys to get from session storage
    let objecKeys = Object.keys(object);

    //Getting values from session storage
    for (x = 0; x < objecKeys.length; x++) {
      //Restarting for loop from next iteration if the value is null, and not saved to session storage.
      if (sessionStorage.getItem(objecKeys[x]) == null || sessionStorage.getItem(objecKeys[x]) == undefined) { continue; }
      object[objecKeys[x]] = sessionStorage.getItem(objecKeys[x]);
      // console.log('%c'
      // + "key: "
      // + objecKeys[x]
      // + " \nvalue gotten: "
      // + sessionStorage.getItem(objecKeys[x]), 'color: red;');
    }
  }
}