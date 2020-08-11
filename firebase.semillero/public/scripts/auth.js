// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});



//listen for auth states changes
auth.onAuthStateChanged (user =>{
    if(user){
 user.getIdTokenResult().then(idTokenResult => {
console.log(idTokenResult.claims)
user.admin=idTokenResult.claims.admin;
          })
console.log('user logged in:',user);
setupUI(user);  
    }
    else{
        console.log('user logged out:');    
        setupUI();  
    }
})

//signup

const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    // get user info
    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
// signup the user

auth.createUserWithEmailAndPassword(email,password).then(cred=>{
     return db.collection('users').doc(cred.user.uid).set({
         name:signupForm['signup-name'].value,
         email:signupForm['signup-email'].value,
         password:signupForm['signup-password'].value,
         CreatedAt: firebase.firestore.FieldValue.serverTimestamp()
     });
    }).then(()=>{
    const modal=document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML='';
}).catch(err =>{
    signupForm.querySelector('.error').innerHTML=err.message;
})

});

//logout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut()
    console.log('signedOut')
    })


//login
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

//get user info
const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
auth.signInWithEmailAndPassword(email,password).then(cred=>{

    //close the login model and reset the fore
    const modal=document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML='';
}).catch(err=>{
    loginForm.querySelector('.error').innerHTML=err.message;
})
})
