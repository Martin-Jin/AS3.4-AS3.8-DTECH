/**************************************************************/
// htmlJs_form.js
// Js code for registration page
/**************************************************************/
MODULENAME = "htmlJs_form.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// Variables and constants
/**************************************************************/

/**************************************************************/
// START OF MODULE
/**************************************************************/
//disables the deafult radio button behaviour for users registration
document.addEventListener('DOMContentLoaded', () => {
  // Get the form element
  const form = document.getElementById('formContainer');

  // Prevent the default form submission behavior
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // Makes it so that clicking on the icon on my radio button also triggers it
  // as the form tag changes the behaviour of the button such that it dosent
  var genderLabels = document.querySelectorAll(".register_gender label");
  // Add an event listener for clicks on each label
  genderLabels.forEach(function (label) {
    label.addEventListener("click", function () {
      // Find the associated radio button
      var radioBtn = label.previousElementSibling;

      // Simulate a click on the radio button
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
  const form = document.getElementById('formContainer');
  const inputs = form.querySelectorAll('input');
  const inputValues = [];

  inputs.forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') {
      if (input.checked) {
        inputValues.push({ [input.name]: input.value });
      }
    } else {
      if (input.name) {
        inputValues.push({ [input.name]: input.value });
      }
    }
  });

  console.log(inputValues);
}
