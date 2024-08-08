/**************************************************************/
// general_general.js
// General HTML js used across all HTML pages
/**************************************************************/
MODULENAME = "general_general.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
//hrefs
const REPL = "https://965664d1-26da-4790-a3f6-439acbe51fc1-00-xx2eye1rpjbg.riker.replit.dev/";
const HOME = "https://965664d1-26da-4790-a3f6-439acbe51fc1-00-xx2eye1rpjbg.riker.replit.dev/index.html"

//Array of coffee
const coffee1 = { image: '/images/images_coffee/coffee_1.jpg', alt: 'coffee1', price: 3.50, name: 'Latte', about: 'A classic Italian coffee drink. This drink is known for its smooth and velvety texture and its balance of espresso and steamed milk, creating a perfect harmony of flavors.', ingredients: 'Espresso and steamed milk.' };
const coffee2 = { image: '/images/images_coffee/coffee_2.jpg', alt: 'coffee2', price: 4.25, name: 'Cappuccino', about: 'A popular coffee drink with a rich, creamy texture.  The cappuccino features a distinct layer of foamed milk, giving it a beautiful presentation and a light, airy texture.  It is a delightful choice for those who prefer a slightly milder coffee experience with a touch of sweetness.', ingredients: 'Espresso, steamed milk, and foamed milk.' };
const coffee3 = { image: '/images/images_coffee/coffee_3.jpg', alt: 'coffee3', price: 5.00, name: 'Espresso', about: 'A concentrated coffee drink with a bold flavor.  The espresso is a true coffee connoisseur’s choice, delivering a strong and intense coffee experience in a small serving.  It is known for its rich aroma and its ability to awaken the senses with its bold and intense flavor.', ingredients: 'Espresso.' };
const coffee4 = { image: '/images/images_coffee/coffee_4.jpg', alt: 'coffee4', price: 3.75, name: 'Americano', about: 'A coffee drink that is similar to black coffee but with a slightly stronger flavor.  The Americano is a perfect choice for those who enjoy the simplicity of black coffee but crave a slightly more intense flavor.  It is a refreshing and invigorating drink that balances the bold espresso with the clean taste of hot water.', ingredients: 'Espresso and hot water.' };
const coffee5 = { image: '/images/images_coffee/coffee_5.jpg', alt: 'coffee5', price: 4.50, name: 'Mocha', about: 'A coffee drink with a rich chocolate flavor.  The mocha is a decadent and indulgent treat that combines the richness of espresso with the sweetness of chocolate syrup and the creamy texture of steamed milk.  It is a perfect choice for those who crave a sweet and satisfying coffee experience.', ingredients: 'Espresso, chocolate syrup, steamed milk, and whipped cream.' };
const coffee6 = { image: '/images/images_coffee/coffee_6.jpg', alt: 'coffee6', price: 5.25, name: 'Frappuccino', about: 'A refreshing blended iced coffee drink.  The Frappuccino is a perfect choice for those who enjoy a cool and refreshing treat.  It combines the bold flavor of espresso with the sweetness of milk, ice, and flavorings, creating a delightful and satisfying experience.', ingredients: 'Espresso, milk, ice, and flavorings.' };

//Links to load after the page loads to improve FCP and LCP
let general_deferLinks = [
  { href: "/css/mediaQueries/mediaQueries_general.css", rel: "stylesheet" },
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  { href: "https://fonts.gstatic.com", rel: "preconnect", crossorigin: "anonymous" },
  { href: "https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,100..900;1,100..900&display=swap", rel: "stylesheet" },
  { href: "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css", rel: "stylesheet", type: "text/css" },
]

/**************************************************************/
// START OF MODULE
/**************************************************************/
fbR_initialise();
//Get saved values then check if user is logged in or not
manager_getValues();
//Loads defered links
general_loadDeferLinks();
//Checking registration and login
general_checkLogin();

/**************************************************************/
// function general_checkLogin()
// checks if user is logged in, only allow user to look at home
// page if they are not logged in.
// after checking login checks registration
/**************************************************************/
function general_checkLogin() {
  console.log("general_checkLogin()");
  console.log("The user is: " + fbV_loginStatus);

  //Don't execute anything if user is logged in, or on home page
  //Just change the navbar so that it shows a sign out button
  if (fbV_loginStatus == 'logged in') {
    general_checkReg();
    document.getElementById("signInBtn").onclick = () => { fb_logout() };
    document.getElementById("signInBtn").innerHTML = "Log out";
    document.getElementById("dropDownSignIn").onclick = () => { fb_logout() };
    document.getElementById("dropDownSignIn").innerHTML = "Log out";
    return;
  };
  function loginAlert() {
    alert("Please login in if you wish to access anymore features on this website. This is on the navbar. If you cannot see it, is in the dropdown menu.")
  }
  if (fbV_loginStatus != 'logged in') {
    if (window.location.href == HOME || window.location.href == REPL) {
      //Select all buttons and links then disable them.
      const buttons = document.querySelectorAll('button');
      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        if (link.getAttribute('id') != "dropDownSignIn" && link.getAttribute('id') != "signInBtn") {
          link.removeAttribute("href");
          link.onclick = () => { loginAlert() };
        }
      });
      buttons.forEach((button) => {
        //Don't disable dropdown menu as users need to open it to sign in
        if (link.getAttribute('id') != "dropDownBtn") {
          button.onclick = () => { loginAlert() };
        }
      });
    }
    else {
      loginAlert();
      window.location.href = HOME;
    }
  }
}

/*************************************************************/
//general_checkReg()
//checks if user has registered
//makes user go register if they haven't
/*************************************************************/
function general_checkReg() {
  console.log("general_checkReg()")
  //Get user to finish registration if they created an account and haven't done it
  if (fbV_registerStatus == 'not registered') {
    //read the database to make sure that the user hasen't registered, as register status will be false 
    //if is not their first time logging in where they had to go register and the status was set to registered
    fb_readRec(fbV_REGISTRATIONPATH, fbV_userDetails.uid, fbV_registerDetails, fbR_procGeneral, () => {
      if (fbV_registerDetails.street == '') {
        console.log("The user is: " + fbV_registerStatus);
        alert("Please register to finish setting up your account. You will be redirected after this alert is closed.");
        window.location = '/html/html_register.html';
        return;
      }
      else {
        fbV_registerStatus = 'registered';
        manager_saveValues();
        console.log("The user is: " + fbV_registerStatus);
      }
    })
  }
}

/**************************************************************/
// function general_loadDeferLinks()
// loads all given defer links
/**************************************************************/
function general_loadDeferLinks() {
  console.log("general_loadDeferLinks()")
  let listener = document.addEventListener('DOMContentLoaded', () => {
    //Adding defered links
    general_deferLinks.forEach((link) => {
      let deferLink = document.createElement("link");
      let linkProperties = Object.keys(link);
      linkProperties.forEach((property) => {
        deferLink[property] = link[property];
      })
      document.head.appendChild(deferLink);
      console.log("%cLink loaded: " + link.href, 'color: purple;')
    });
    //Clearing queue when done
    general_deferLinks = [];
    //Remove the event listener after it's done
    document.removeEventListener('DOMContentLoaded', listener);
  });
}

/**************************************************************/
// function general_displayCard()
// sets the info for product page of coffee
// called: after user clicks on a coffee product and they are sent
// to the product page
/**************************************************************/
function general_displayCard() {
  console.log("general_displayCard()");
  const JSONSTRING = sessionStorage.getItem("coffee");
  if (JSONSTRING == null) { return }
  let coffee = JSON.parse(JSONSTRING);
  console.log(coffee);
  //Updating values on coffee page
  COFFEE.innerHTML = coffee.name;
  PRICE.innerHTML = coffee.price;
  IMAGE.src = coffee.image;
  DESCRIPTION.innerHTML = coffee.about;
  INGREDIENTS.innerHTML = coffee.ingredients;
  IMAGE.alt = coffee.alt;
}

/**************************************************************/
// function general_showProduct()
// takes user to the product page
// input: coffee object to show
// called: after user clicks on a coffee product
/**************************************************************/
function general_showProduct(coffee) {
  console.log("general_showProduct()");
  //Saving the coffee object to session storage, then sending the user to
  //the product page
  sessionStorage.setItem("coffee", JSON.stringify(coffee));
  window.location = "/html/html_coffee.html";
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/