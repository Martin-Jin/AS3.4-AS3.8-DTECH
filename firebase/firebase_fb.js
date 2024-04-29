/**************************************************************/
// firebase_fb.js
/**************************************************************/
MODULENAME = "firebase_fb.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');
/**************************************************************/
// START OF MODULE
/**************************************************************/

/**************************************************************/
// fb_login(_save, _procFunc)
// Called by general_login(); when user clicks on login button
// Logs the user in
/**************************************************************/
function fb_login(_save, _procFunc) {
  console.log('%cfb_login: ', 'color: brown;');

  //Disabling login button
  document.getElementById("login_button").disabled = true;

  firebase.auth().onAuthStateChanged((user) => {
    if (user && fbV_loginStatus !== 'logged in via popup') {
      fbV_loginStatus = 'logged in';
      console.log(fbV_loginStatus);
      _procFunc(user, _save, fbV_loginStatus);
    }

    else {
      //Uer NOT logged in, so redirect to Google login
      fbV_loginStatus = 'logged in via popup';
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(fbV_loginStatus);
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
// fb_writeRec(_path, _key, _data, _procErr, _callBack)
// Write a specific record & key to the DB
// Input: path to write to, the key and the data to write,
// a procErr function to process the error and optional callBack
/**************************************************************/
function fb_writeRec(_path, _key, _data, _procErr, _callBack) {
  fbV_writeStatus = "waiting...";
  console.log('%cfb_WriteRec: path= ' + _path + ' key= ' + _key, 'color: brown;');

  fbV_dataBase.ref(_path + '/' + _key).set(_data, gotError);

  console.log(_callBack);
  //Process any errors if there is one
  function gotError(error) {
    _procErr(error, _callBack);
  }
}

/**************************************************************/
// fb_readRec(_path, _key, _save, _procFunc, _callBack)
// Read a specific DB record
// Input:  path & key of record to read and where to save the data
// proc func to process data and optional call back function
/**************************************************************/
function fb_readRec(_path, _key, _save, _procFunc, _callBack) {
  fbV_readStatus = "waiting...";
  console.log('%cfb_readRec: path= ' + _path +
    '  key= ' + _key, 'color: brown;');
  fbV_dataBase.ref(_path + '/' + _key).once("value", gotRecord, fb_readErr);

  function gotRecord(snapshot) {
    _procFunc(snapshot, _save, fbV_readStatus, _callBack);
  }

  function fb_readErr(error) {
    fbV_readStatus = "Failed";
    console.log(error);
  }
}
/**************************************************************/
// END OF MODULE
/**************************************************************/