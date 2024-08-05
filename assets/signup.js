const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); //preventing form submit
 forms.classList.toggle("show-signup");
})
})



















import {auth , createUserWithEmailAndPassword} from "./firebase.js"



function signUpFunction(){
  const toast = document.querySelector('.toast')
  const signupEmail = document.getElementById('signup-email')
  const signupPassword = document.getElementById('signup-password')
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    console.log('signup successful');
    Swal.fire({
      title: "Good job!",
      text: "You have sucessfully created account",
      icon: "success"
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode,
    });
  });
}

let signupbtn = document.getElementById('signupbtn')
console.log(signupbtn);

signupbtn.addEventListener('click' , signUpFunction)