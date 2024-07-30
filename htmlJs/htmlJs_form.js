/**************************************************************/
// htmlJs_form.js
// Js code for forms
/**************************************************************/
MODULENAME = "htmlJs_form.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// variables and constants
/**************************************************************/
const form_INPUTEVENT = new Event('input');

/**************************************************************/
// START OF MODULE
/**************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  //Get the form element
  const form = document.getElementById('formContainer');

  //Prevent the default form submission behavior
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.reportValidity()) {
      //Passed validation so submit
      form_submit();
    }
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
    input.dispatchEvent(form_INPUTEVENT);
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
  let data = {};

  inputs.forEach(input => {
    //Going through each input and saving the key value pair
    //to the registration details object
    if (input.type === 'radio' || input.type === 'checkbox') {
      if (input.checked) {
        data[input.name] = input.value;
      }
    } else {
      if (input.name) {
        data[input.name] = input.value;
      }
    }
    input.disabled = true;
  });
  //Disabling the button then calling call back function
  document.getElementById("submit").disabled = true;
  form_callBack(data);
}
