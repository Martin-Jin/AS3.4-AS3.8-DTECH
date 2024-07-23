/**************************************************************/
// htmlJs_form.js
// Js code for registration page
/**************************************************************/
MODULENAME = "htmlJs_form.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/
let form_valid = false;

/**************************************************************/
// START OF MODULE
/**************************************************************/
//disables the deafult radio button behaviour for users registration
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
  var genderLabels = document.querySelectorAll(".register_gender label");
  //Add an event listener for clicks on each label
  genderLabels.forEach((label) => {
    label.addEventListener("click", function() {
      //Find the associated radio button
      var radioBtn = label.previousElementSibling;

      //Simulate a click on the radio button
      radioBtn.click();
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