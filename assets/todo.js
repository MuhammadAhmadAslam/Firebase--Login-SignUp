import { signOut , auth , getAuth, onAuthStateChanged , db ,
  getFirestore, 
  collection , 
  addDoc ,
  getDocs ,
  query,
   where,
   deleteDoc ,
    onSnapshot ,
    updateDoc, 
    deleteField , doc  } from "./firebase.js"



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('user login ha');
      
    } else {
        console.log('user login nahe');
        window.location.href = '../index.html'
        
    }
  });

let showLoader = () => {
  
  let spinner = document.querySelector('.spinner')
  console.log(spinner);
  spinner.classList.add('s')
  spinner.classList.remove('s-none')
}


let hideLoader = () => {
  let spinner = document.querySelector('.spinner')
  spinner.classList.add('s-none')
  spinner.classList.remove('s')
}







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
            todoInput.value = ''

        } catch (e) {
          console.error("Error adding document: ", e);
        }

      }else{
        alert('Please Fill In Input')
      }
}



todoBtn.addEventListener('click' , makinglist)






let getToDo = () => {
  showLoader()
  onSnapshot(collection(db, "todo"), (snapshot) => {
    list.innerHTML = '';
    snapshot.forEach((doc) => {
      let { todo } = doc.data();
      list.innerHTML += `<li id='makingli' class='li' data-id='${doc.id}'> ${todo} <i class="fa-solid fa-pen-to-square icons1 edit-icon"></i> <i class="fa-solid fa-trash icons2 bin-icon"></i></li>`;
    });

    const binIcons = document.querySelectorAll('.bin-icon');
    binIcons.forEach((bin) => {
      bin.addEventListener('click', async (event) => {
        const li = event.target.closest('li');
        const docId = li.getAttribute('data-id');
        try {
          await deleteDoc(doc(db, "todo", docId));
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      });


      const editIcon = document.querySelectorAll('.edit-icon')
      
      editIcon.forEach((edit , index) => {
            edit.addEventListener('click' , editFunction)
    });
  });

  hideLoader()
});
}
// Call the function to fetch and display todos
getToDo();

function editFunction(event) {
    
  const li = event.target.closest('li');
  const docId = li.getAttribute('data-id');
  const inp = document.createElement('input')
  li.classList.remove('li')
  inp.value = li.innerText
  li.innerText = ''
  const btn = document.createElement('button')
  btn.innerText = 'ADD TODO'
  inp.classList.add('inp')
  btn.classList.add('btn')
  li.appendChild(inp)
  li.appendChild(btn)
  btn.addEventListener('click' , () => {
    if (inp.value) {
       try {
          updateDoc(doc(db, "todo", docId), {
           todo: inp.value
         })
         li.innerText = todoInput.value
       } catch (error) {
         console.log(error);
         
       }
    }
    
  })
}