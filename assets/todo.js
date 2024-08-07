import { signOut , auth , getAuth, onAuthStateChanged , db ,
  getFirestore, 
  collection , 
  addDoc ,
  getDocs } from "./firebase.js"



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('user login ha');
      
    } else {
        console.log('user login nahe');
        window.location.href = '../index.html'
        
    }
  });







const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
   console.log('Sign-out successful.');
   window.location.href = '../index.html'
  }).catch((error) => {
    console.log('An error happened.')
  });
})


const todoBtn = document.getElementById('todoBtn') , 
todoInput = document.getElementById('todo-input') ,
list = document.getElementById('list')


let  makinglist = async () => {
      if (todoInput.value != '') {
        try {
          const docRef = await addDoc(collection(db, "todo"), {
              todo: todoInput.value
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }




          

          const querySnapshot = await getDocs(collection(db, "todo"));
          querySnapshot.forEach((doc) => {
           list.innerHTML = `<li> ${doc.data()} </li>`
          todoInput.value = ''
            
          });





      }else{
        alert('Please Fill In Input')
      }
}



todoBtn.addEventListener('click' , makinglist)








