/**************************************************************/
// htmlJs_register.js
// Js code for registration page
/**************************************************************/
MODULENAME = "htmlJs_register.js";
console.log('%c' + MODULENAME, 'color: red;');
/**************************************************************/
// variables and constants
/**************************************************************/

/**************************************************************/
// START OF MODULE
/**************************************************************/
//Loading defered links
general_deferLinks.push({ href: "/css/mediaQueries/mediaQueries_register.css", rel: "stylesheet" });
general_loadDeferLinks();

document.addEventListener('DOMContentLoaded', () => {
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
});

/*************************************************************/
//form_callBack()
//what happens when the user submits their data for registration
//writes users registration details to firebase
//input: data from the form
//Called by form_submit()
/*************************************************************/
function form_callBack(data) {
  console.log("form_callBack()");
  console.log(data);
  fbR_saveSnapshot(data, fbV_registerDetails, () => {
    alert("Thank you for registering. You will be redirected back to the home page after you close this prompt.");
    fb_writeRec(fbV_REGISTRATIONPATH, fbV_userDetails.uid, fbV_registerDetails, ()=>{manager_saveValues(); window.location = '../index.html';});
  });
}
