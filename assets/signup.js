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



















import {auth , createUserWithEmailAndPassword ,  GoogleAuthProvider, signInWithPopup , provider} from "./firebase.js"



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

signupbtn.addEventListener('click' , signUpFunction);

let googleAuthenticationFunction = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(credential);
    console.log(user);
    Swal.fire({
      title: "Good job!",
      text: "You have sucessfully created account",
      icon: "success"
    });
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode);
    console.log(errorMessage);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode,
    });
  });
}


const signupGoogle = document.getElementById('signup-google')

signupGoogle.addEventListener('click' , googleAuthenticationFunction)