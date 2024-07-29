/**************************************************************/
// htmlJs_form.js
// Js code for registration page
/**************************************************************/
MODULENAME = "htmlJs_form.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// letiables and constants
/**************************************************************/
let form_valid = false;

//Loading defered links
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_register.css", rel: "stylesheet" });
general_loadDeferLinks();

/**************************************************************/
// START OF MODULE
/**************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  //Get the form element
  const form = document.getElementById('formContainer');

  //Prevent the default form submission behavior
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    //Passed validation so allow user to click submit button
    form_valid = true;
  });

  //Makes it so that clicking on the icon on my radio button also triggers it
  //as the form tag changes the behaviour of the button such that it dosent
  let genderLabels = document.querySelectorAll(".register_gender label");
  //Add an event listener for clicks on each label
  genderLabels.forEach((label) => {
    label.addEventListener("click", () => {
      //Find the associated radio button
      let radioBtn = label.previousElementSibling;

      //Simulate a click on the radio button
      radioBtn.click();
    });
  });

  //giving user feedback if what they input is correct in real time
  let inputs = document.querySelectorAll("input");
  //Add an event listener for input
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value != '') {
        if (input.checkValidity()) {
          //Change border to green if is right
          input.style.setProperty("border-color", "#1ae57b", "important");
        } else {
          //Change border to red if is wrong
          input.style.setProperty("border-color", "#ff4444", "important");
        }
      } else {
        //If nothing inputed just leave as deafult
        input.style.setProperty("border-color", "#fbf8f6", "important");
      }
    });
  });
});

/*************************************************************/
//form_submit()
//Submits the users data to firebase
//Called by submit button
/*************************************************************/
function form_submit() {
  console.log("form_submit()")
  //Prevent submission if form is not valid
  if (!form_valid) { return };
  const form = document.getElementById('formContainer');
  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    //Going through each input and saving the key value pair
    //to the registration details object
    if (input.type === 'radio' || input.type === 'checkbox') {
      if (input.checked) {
        fbV_registerDetails[input.name] = input.value;
      }
    } else {
      if (input.name) {
        fbV_registerDetails[input.name] = input.value;
      }
    }
    input.disabled = true;
  });
  //Disabling the button then writing details to database
  document.getElementById("submit").disabled = true;
  fbV_registerStatus = "registered";
  fb_writeRec(fbV_REGISTRATIONPATH, fbV_userDetails.uid, fbV_registerDetails, manager_saveValues);
  alert("Thank you for registering. You will be redirected back to the home page after you close this prompt.");
  window.location = '../index.html';
}
