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



















import {auth , createUserWithEmailAndPassword , sendSignInLinkToEmail 
   , GoogleAuthProvider, signInWithPopup , provider , onAuthStateChanged , signInWithEmailAndPassword} from "./firebase.js"



function signUpFunction(){
  const toast = document.querySelector('.toast')
  const signupEmail = document.getElementById('signup-email')
  const signupPassword = document.getElementById('signup-password')
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    signupEmail.value = ''
    signupPassword.value = ''
    Swal.fire({
      title: "Good job!",
      text: "You have sucessfully created account",
      icon: "success"
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    signupEmail.value = ''
    signupPassword.value = ''
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode,
    });
  });
}

let signupbtn = document.getElementById('signupbtn')

signupbtn.addEventListener('click' , signUpFunction);

let googleAuthenticationFunction = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
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
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode,
    });
  });
}
let googleLoginFunction = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    Swal.fire({
      title: "Good job!",
      text: "You have sucessfully LogIn",
      icon: "success"
    });
    window.location.href = 'assets/dashboard.html'
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode,
    });
  });
}


const signupGoogle = document.getElementById('signup-google')

signupGoogle.addEventListener('click' , googleAuthenticationFunction)

const loginGoogle = document.getElementById('login-google')
loginGoogle.addEventListener('click' , googleLoginFunction)


const loginEmail = document.getElementById('login-email'),
loginPassword = document.getElementById('login-password'),
loginBtn = document.getElementById('loginBtn')


let loginAuthenticate = () => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location.href = 'assets/dashboard.html'
    console.log(user);
    loginEmail.value = ''
    loginPassword.value = ''
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    loginEmail.value = ''
    loginPassword.value = ''
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'InValid Password And Email Address',
    });
    
  });
}

loginBtn.addEventListener('click' , loginAuthenticate)
