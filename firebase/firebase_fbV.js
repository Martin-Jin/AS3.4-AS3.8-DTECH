/**************************************************************/
// firebase_fbV.js
/**************************************************************/
MODULENAME = "firebase_fbV.js";
console.log('%c' + MODULENAME, 'color: red;');

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
const fbV_ORDERSPATH = "userOrders"; //<=============== Firebase paths
const fbV_REGISTRATIONPATH = "userDetails/registrationDetails"; //<=============== Firebase paths
const fbV_LOGINDETAILSPATH = "userDetails/loginDetails"; //<=============== Firebase paths
const fbV_SHOPPINGCARTPATH = "userDetails/shoppingCart"; //<=============== Firebase paths

let fbV_userDetails = { //<=============== Object to store the details of the current user
  uid: '',
  email: '',
  displayName: '',
  photoURL: ''
};

let fbV_registerDetails = { //<=============== Object to store the details of the current user
  street: '',
  suburb: '',
  city: '',
  post: '',
  phoneNumber: '',
  gender: '',
};

let fbV_orderDetails = { //<=============== Object to store the details of the current user
  uid: '1234567890',
  displayName: 'Name',
  email: 'email@email.com',
  product: 'coffee 2',
  size: 'large',
  //For example pick up or delivery
  collectionMethod: 'Delivery',
  //Will be displayed if user wants their coffee delivered
  userAddress: '123 street'
}

// login status of the user
let fbV_loginStatus = 'not logged in';
let fbV_registerStatus = 'not registered';
let fbV_adminStatus = 'false';

const fbV_APIKEY = "AIzaSyASbBs9pp5P2RH-xZEWKASHC9-IwveMSVs";
const fbV_AUTHDOMAIN = "dtech-2024-martin-jin.firebaseapp.com";
const fbV_PROJECTID = "dtech-2024-martin-jin";
const fbV_STORAGEBUCKET = "dtech-2024-martin-jin.appspot.com";
const fbV_MESSAGINGSENDERID = "259771194437";
const fbV_APPID = "1:259771194437:web:694e8e0a5c50214f02972c";
const fbV_MEASUREMENTID = "G-JCHSMPHTSM";
const fbV_DATABASEURL = "https://dtech-2024-martin-jin-default-rtdb.firebaseio.com";
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/