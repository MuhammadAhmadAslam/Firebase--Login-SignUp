 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getAuth , createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 const firebaseConfig = {
   apiKey: "AIzaSyAcEusuBViHZG_gqw8BqABccSmVDXUvH70",
   authDomain: "muhammad-ahmed-demo-work.firebaseapp.com",
   projectId: "muhammad-ahmed-demo-work",
   storageBucket: "muhammad-ahmed-demo-work.appspot.com",
   messagingSenderId: "1045072993781",
   appId: "1:1045072993781:web:cb6313a279bed9978014bc"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();

export {
  auth , 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider
}
 