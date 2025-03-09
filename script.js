// to store the register data in the form of array in localStorage
function storedata(event){
    event.preventDefault();
   const username= document.getElementById('name').value;
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const cnf_pass=document.getElementById('conf_pass').value;
   if(password!==cnf_pass){
    alert('Password doesnt match');
    return;
   }
   const details={
    name:username,
    mail:email,
    pass:password,
    confpass:cnf_pass
   }
   localStorage.setItem('userDetails', JSON.stringify(details));

   alert('Registration details saved!');
}
//to check wheather the register details and login details are same
// if not pop up the alert message
function logcheck(event){
    event.preventDefault();
    const nameOremail=document.getElementById('nameOremail').value;
    const pass=document.getElementById('password').value;

  const retrievedetails=JSON.parse(localStorage.getItem('userDetails'));

  if(retrievedetails){
    if(((nameOremail===retrievedetails.mail)||(nameOremail===retrievedetails.name))&&(pass===retrievedetails.pass)){
      window.location.href = "homepage.html";
    }else{
        alert('invalid username or password');
    }
  }else{
    alert('Please Register');
  }
}
  let count=0;
  let cartItems =[];
  // to add the item on the cart 
  //briyani page invoke it
  function cart(itemname,itemprice){
    count++;
    cartItems.push({name:itemname,price:itemprice});
    localStorage.setItem('cart-item-list', JSON.stringify(cartItems));
    document.getElementById("cartcount").textContent=count;
  
   
     }
   
    window.onload=function(){
     document.getElementById("cartcount").textContent = count;
    }
  
  function gotocart(){
    document.location.href="cart.html";
   }
  //profile to retrieve details
  document.addEventListener('DOMContentLoaded', () => {
  
    const username = document.querySelector('.username');
    const usemail = document.querySelector('.usemail');
    const phno = document.querySelector('.phno');
    const add = document.querySelector('.add');
    const phnoinput = document.querySelector('.phnoinput');
    const addinput = document.querySelector('.addinput');
    const savebutton = document.querySelector('.savebutton');
    const editbutton = document.querySelector('.editbutton');
    const editsection = document.querySelector('.editsection');
  
    function loadprofile() {
      const profile = JSON.parse(localStorage.getItem('userDetails')) || {};
    
     const ff=document.querySelectorAll('.username');
       ff.forEach(ffq => {
        ffq.textContent=profile.name;
      });
      usemail.textContent = profile.mail || 'Not provided';
      phno.textContent = profile.phone || 'Not provided';
      add.textContent = profile.address || 'Not provided';
  
    }
  
    // Save profile to localStorage
    function saveprofile() {
      const profile = JSON.parse(localStorage.getItem('userDetails')) || {};
      profile.phone = phnoinput.value;
      profile.address = addinput.value;
      localStorage.setItem('userDetails', JSON.stringify(profile));
  
     
      phno.textContent = profile.phone;
      add.textContent = profile.address;
      alert('Profile updated successfully!');
    }
  
    
    savebutton.addEventListener('click', () => {
      saveprofile();
      editsection.style.display = 'none'; 
      editbutton.style.display = 'inline-block'; 
      savebutton.style.display = 'none'; 
    });
  
   
    editbutton.addEventListener('click', () => {
      editsection.style.display = 'block'; 
      editbutton.style.display = 'none'; 
      savebutton.style.display = 'inline-block'; 
    });
  
    loadprofile();
  });
  

 
  /*const retrievedetails=JSON.parse(localStorage.getItem('userDetails'));
  const ret_name=document.querySelectorAll('.username');
  ret_name.forEach(divs =>{
    divs.textContent=retrievedetails.name;
  })
  document.getElementsByClassName("usemail").textContent=retrievedetails.mail;*/
  

