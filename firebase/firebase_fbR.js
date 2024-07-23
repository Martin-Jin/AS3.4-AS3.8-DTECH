/**************************************************************/
// firebase_fbR
/**************************************************************/
MODULENAME = "firebase_fbR.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// fbR_procUserLogin(user, _save, loginStatus);
// Process user login data
// Input: the user's data and where to save it to
/**************************************************************/
function fbR_procUserLogin(user, _save) {
  console.log("fbR_procUserLogin();")
  //Saving the login data
  fbV_loginStatus = 'logged in';
  fbR_saveSnapshot(user, _save);

  //Writing login info to database
  fb_writeRec(fbV_LOGINDETAILSPATH, _save.uid, _save);
  console.log('fbR_login: status = ' + fbV_loginStatus);

  //Changing the html for when users are logged in
  manager_checkLogin();
  //Saving login status and details
  manager_saveValues();
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
// fbR_procGeneral(snapshot, _save, readStatus, callBack);
// Process the read data in general for reads
// Input: the data and loucation to save to, optional callBack function
/**************************************************************/
function fbR_procGeneral(snapshot, _save, readStatus, callBack) {
  console.log("fbR_procGeneral();");
  if (snapshot.val() == null) {
    readStatus = "Not found";
  }
  else {
    readStatus = "OK";
    console.log(snapshot.val());
    let dbData = snapshot.val();
    //Saving snapshot
    fbR_saveSnapshot(dbData, _save, callBack);
  }
  console.log('fbR_procGeneral: status = ' + readStatus);
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
    fbV_writeStatus = "Failed";
  }
  else {
    fbV_writeStatus = "OK";
  }
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
  for (x=0; x < saveKeys.length; x++) {
    let saveKey = saveKeys[x];
    for (i=0; i < snapshotKeys.length; i++) {
      let snapshotKey = snapshotKeys[i];
      //When they match, save the value
      if (saveKey == snapshotKey) {
        save[saveKey] = snapshot[snapshotKey];
        //console.log(saveKey + " is saved as: " + save[saveKey]);
      };
    }
  }
  if (callBack != null) {callBack();}
}
/**************************************************************/
// END OF MODULE
/**************************************************************/