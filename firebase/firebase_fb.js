/**************************************************************/
// firebase_fb.js
/**************************************************************/
MODULENAME = "firebase_fb.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// START OF MODULE
/**************************************************************/
let readOnStatus;
let readStatus;
let writeStatus;

/**************************************************************/
// fb_login(_save, _procFunc)
// Called by general_login(); when user clicks on login button
// Logs the user in
// input: where to save login info and proc func to process it
/**************************************************************/
function fb_login(_save, _procFunc) {
  console.log('%cfb_login: ', 'color: brown;');

  //Disabling login button
  document.getElementById("signInBtn").onclick = () => { alert("Please press the login button only once. If you accidently closed the login window, please reload the page and try again.") };

  firebase.auth().onAuthStateChanged((user) => {
    if (fbV_loginStatus == 'logged out') {
      return;
    }

    else if (user && fbV_loginStatus != 'logged in') {
      fbV_loginStatus = 'logged in';
      console.log("The user is logged in");
      _procFunc(user, _save, fbV_loginStatus);
    }

    else if (fbV_loginStatus == 'not logged in') {
      //Uer NOT logged in, so redirect to Google login
      fbV_loginStatus = 'logged in via popup';
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log("The user logged in with a pop up");
        _procFunc(result.user, _save, fbV_loginStatus);
      })
        //Catch errors
        .catch(function(error) {
          if (error) {
            loginStatus = 'failed';
            console.log('%cfb_login: ' + error.code + ', ' +
              error.message, 'color: red;');
          }
        });
    }
  });
}

/**************************************************************/
// fb_logout()
// Called by log out button
// Logout of Firebase
/**************************************************************/
function fb_logout() {
  console.log('%cfb_logout: ', 'color: brown;');
  firebase.auth().signOut();

  //Resetting user status
  fbV_loginStatus = 'logged out';
  fbV_registrationStatus = 'not registered';
  fbV_adminStatus = false;
  sessionStorage.clear();
  window.location.reload();
}

/**************************************************************/
// fb_readOn(listener, _save, _procFunc, callBack)
// Checks a specific database record for change
// Input:  the listener to listen for change and optional _save for 
//         where to save the data
//         proc func to process data and 
//         optional call back function
/**************************************************************/
function fb_readOn(listener, _save, _procFunc, callBack) {
  readOnStatus = "waiting...";
  console.log('%cfb_readOn: listener=' + listener, 'color: brown;');

  listener.on("value", gotRecord, fb_readErr);

  function gotRecord(snapshot) {
    _procFunc(snapshot, _save, callBack);
  }

  function fb_readErr(error) {
    fbV_readOnStatus = "Failed";
    console.log(error);
  }
}

/**************************************************************/
// fb_writeRec(_path, _key, _data, _callBack)
// Write a specific record & key to the DB
// Input: path to write to, the key and the data to write,
// and optional callBack
/**************************************************************/
function fb_writeRec(_path, _key, _data, _callBack) {
  writeStatus = "waiting...";
  console.log('%cfb_writeRec: path= ' + _path + ' key= ' + _key, 'color: brown;');

  fbV_dataBase.ref(_path + '/' + _key).set(_data, gotError);

  //Process any errors if there is one
  function gotError(error) {
    fbR_procWriteError(error, _callBack);
  }
}

/**************************************************************/
// fb_readRec(_path, _key, _save, _procFunc, _callBack)
// Read a specific DB record
// Input:  path & key of record to read and where to save the data
// proc func to process data and optional call back function
/**************************************************************/
function fb_readRec(_path, _key, _save, _procFunc, _callBack) {
  readStatus = "waiting...";
  console.log('%cfb_readRec: path= ' + _path +
    '  key= ' + _key, 'color: brown;');
  fbV_dataBase.ref(_path + '/' + _key).once("value", gotRecord, fb_readErr);

  function gotRecord(snapshot) {
    _procFunc(snapshot, _save, _callBack);
  }

  function fb_readErr(error) {
    fbV_readStatus = "Failed";
    console.log(error);
  }
}
/**************************************************************/
// END OF MODULE
/**************************************************************/