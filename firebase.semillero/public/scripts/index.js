// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
const loggedOutLinks=document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails=document.querySelector('.account-details');
const adminItems=document.querySelectorAll('.admin');
const setupUI=(user)=>{

  if(user){
    // account Info
    db.collection('users').doc(user.uid).get().then(doc =>{
if(user.admin){
  adminItems.forEach(item=>item.style.display='block');
}
  const html =`<div>Hello ${doc.data().name}</div>
  <div>Logged in ${user.email}</div> 
  <div class="pink-text">${user.admin ? 'Admin':''}</div>`;
  accountDetails.innerHTML=html;
})
//toggle UI LInks
loggedInLinks.forEach(item=>item.style.display = 'block');
loggedOutLinks.forEach(item=>item.style.display = 'none');
  }
  else{
    adminItems.forEach(item=>item.style.display='none');
    // hide account info
    accountDetails.innerHTML='';
loggedInLinks.forEach(item=>item.style.display = 'none');
loggedOutLinks.forEach(item=>item.style.display = 'block');

  }
}

