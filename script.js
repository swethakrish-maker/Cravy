// to store the register data in the form of array in localStorage
function storedata(event) {
  event.preventDefault();
  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cnf_pass = document.getElementById('conf_pass').value;
  if (password !== cnf_pass) {
    alert('Password doesnt match');
    return;
  }
  const details = {
    name: username,
    mail: email,
    pass: password,
    confpass: cnf_pass
  }
  localStorage.setItem('userDetails', JSON.stringify(details));

  alert('Registration details saved!');
}

function profile() {
  const retrievedetails = JSON.parse(localStorage.getItem('userDetails'));
  if (retrievedetails) {
    const userElements = document.querySelectorAll('.user');
    userElements.forEach(el => {
      if (el) el.innerHTML = retrievedetails.name;
    });
    const emailElement = document.querySelector('.email');
    if (emailElement) emailElement.innerHTML = retrievedetails.mail;

    // Load existing profile data if available
    loadProfile();

    // Check if profile exists to show appropriate view
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData && profileData.phone) {
      showProfileDisplay();
    } else {
      showProfileForm();
    }
  }
}

// Save profile data to localStorage
function saveProfile() {
  const phone = document.getElementById('phno').value;
  const address = document.getElementById('address').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value;
  const preferences = document.getElementById('preferences').value;

  if (!phone || !address) {
    alert('Please fill in required fields: Phone and Address');
    return;
  }

  const retrievedetails = JSON.parse(localStorage.getItem('userDetails'));
  const profileData = {
    name: retrievedetails.name,
    email: retrievedetails.mail,
    phone: phone,
    address: address,
    age: age,
    city: city,
    preferences: preferences
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));
  alert('Profile saved successfully!');
  showProfileDisplay();
}

// Load profile data into form
function loadProfile() {
  const profileData = JSON.parse(localStorage.getItem('profileData'));
  if (profileData) {
    // Safely update form elements
    const phoneEl = document.getElementById('phno');
    const addressEl = document.getElementById('address');
    const ageEl = document.getElementById('age');
    const cityEl = document.getElementById('city');
    const preferencesEl = document.getElementById('preferences');

    if (phoneEl) phoneEl.value = profileData.phone || '';
    if (addressEl) addressEl.value = profileData.address || '';
    if (ageEl) ageEl.value = profileData.age || '';
    if (cityEl) cityEl.value = profileData.city || '';
    if (preferencesEl) preferencesEl.value = profileData.preferences || '';

    // Safely update display elements
    const displayName = document.querySelector('.display-name');
    const displayEmail = document.querySelector('.display-email');
    const displayPhone = document.querySelector('.display-phone');
    const displayAge = document.querySelector('.display-age');
    const displayCity = document.querySelector('.display-city');
    const displayPreferences = document.querySelector('.display-preferences');
    const displayAddress = document.querySelector('.display-address');

    if (displayName) displayName.innerHTML = profileData.name || '';
    if (displayEmail) displayEmail.innerHTML = profileData.email || '';
    if (displayPhone) displayPhone.innerHTML = profileData.phone || '';
    if (displayAge) displayAge.innerHTML = profileData.age || 'Not specified';
    if (displayCity) displayCity.innerHTML = profileData.city || 'Not specified';
    if (displayPreferences) displayPreferences.innerHTML = profileData.preferences || 'Not specified';
    if (displayAddress) displayAddress.innerHTML = profileData.address || '';
  }
}

// Show profile form for editing
function showProfileForm() {
  const profileForm = document.getElementById('profile-form');
  const profileDisplay = document.getElementById('profile-display');
  if (profileForm) profileForm.style.display = 'block';
  if (profileDisplay) profileDisplay.style.display = 'none';
}

// Show profile display view
function showProfileDisplay() {
  loadProfile();
  const profileForm = document.getElementById('profile-form');
  const profileDisplay = document.getElementById('profile-display');
  if (profileForm) profileForm.style.display = 'none';
  if (profileDisplay) profileDisplay.style.display = 'block';
}

// Edit profile - switch to form view
function editProfile() {
  showProfileForm();
}

// Clear profile data
function clearProfile() {
  const confirmation = confirm('Are you sure you want to clear your profile data?');
  if (confirmation) {
    localStorage.removeItem('profileData');
    document.getElementById('phno').value = '';
    document.getElementById('address').value = '';
    document.getElementById('age').value = '';
    document.getElementById('city').value = '';
    document.getElementById('preferences').value = '';
    alert('Profile cleared successfully!');
    showProfileForm();
  }
}
//to check wheather the register details and login details are same
// if not pop up the alert message
function logcheck(event) {
  event.preventDefault();
  const nameOremail = document.getElementById('nameOremail').value;
  const pass = document.getElementById('password').value;

  const retrievedetails = JSON.parse(localStorage.getItem('userDetails'));

  if (retrievedetails) {
    if (((nameOremail === retrievedetails.mail) || (nameOremail === retrievedetails.name)) && (pass === retrievedetails.pass)) {
      window.location.href = "homepage.html";
    } else {
      alert('invalid username or password');
    }
  } else {
    alert('Please Register');
  }
}

//show which content is to display
function showcontent(section) {
  document.querySelector('.home').style.display = section === 'home' ? 'block' : 'none';
  document.querySelector('.briyani-content').style.display = section === 'briyani' ? 'block' : 'none';
  document.querySelector('.cart-content').style.display = section === 'cart' ? 'block' : 'none';
  document.querySelector('.profile-content').style.display = section === 'profile' ? 'block' : 'none';

}


// to add the item on the cart 
function render() {
  const cartItems = JSON.parse(localStorage.getItem('cart-item-list')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceContainer = document.getElementById('total-price');

  // Safety check - only render if cart elements exist
  if (!cartItemsContainer || !totalPriceContainer) {
    return;
  }

  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  if (cartItems.length === 0) {

    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = ` <td colspan="6" style="text-align:center;">  <span>🛒</span><b>🥺Your cart is empty</b></td>`;
    cartItemsContainer.appendChild(emptyRow);
  } else {
    for (let item of cartItems) {
      const itemName = item.name;
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);

      // Create a new row for each item
      // and append it to the cart items container

      const row = document.createElement('tr');
      row.innerHTML = `<td>${itemName}</td>
          <td>${(itemPrice * itemQuantity).toFixed(2)}</td>
          <td>${itemQuantity}</td>
          <button class="add-item" onclick="cart('${itemName}', '${itemPrice}')">➕</button>
          <button class="remove-item" onclick="removeItem('${itemName}')">🗑️</button>
          <button class="decrease-item" onclick="decreaseItem('${itemName}')">➖</button>`;

      cartItemsContainer.appendChild(row);

      totalPrice += itemPrice * itemQuantity // accumulate total price
    }
  }

  totalPriceContainer.textContent = (totalPrice).toFixed(2);// display total price


}

//to render the cart count after load as well add the items with previous one
document.addEventListener('DOMContentLoaded', () => {
  const cartCountElement = document.getElementById("cartcount");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
  render();
});
let cartItems_array = JSON.parse(localStorage.getItem('cart-item-list')) || [];
let count = cartItems_array.length;
//cart function add to cart button invoke it

function cart(itemname, itemprice) {

  cartItems_array = JSON.parse(localStorage.getItem('cart-item-list')) || [];
  let index = cartItems_array.findIndex(item => item.name === itemname);
  if (index != -1) {
    cartItems_array[index].quantity += 1; // increment quantity if item already exists
  } else {
    cartItems_array.push({
      name: itemname,
      price: Number(itemprice),
      quantity: 1
    });
    count++;
  }
  localStorage.setItem('cart-item-list', JSON.stringify(cartItems_array));
  const cartCountElement = document.getElementById("cartcount");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
  render();
}

function clearCart() {
  const confirmation = confirm("Are you sure you want to clear the cart?");
  if (!confirmation) return;
  localStorage.removeItem('cart-item-list');
  const cartCountElement = document.getElementById("cartcount");
  if (cartCountElement) {
    cartCountElement.textContent = 0;
  }
  render();
}

function decreaseItem(_itemName) {
  cartItems_array = JSON.parse(localStorage.getItem('cart-item-list')) || [];
  const index = cartItems_array.findIndex(item => item.name === _itemName);
  if (index !== -1) {
    if (cartItems_array[index].quantity > 1) {
      cartItems_array[index].quantity -= 1; // Decrease quantity
    } else {
      cartItems_array.splice(index, 1); // Remove item if quantity is 1
      count--;
    }
    localStorage.setItem('cart-item-list', JSON.stringify(cartItems_array));
    const cartCountElement = document.getElementById("cartcount");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
    render();
  }

}
function removeItem(_itemName) {
  cartItems_array = JSON.parse(localStorage.getItem('cart-item-list')) || [];
  const confirmation = confirm("Are you sure you want to remove this item?");
  if (!confirmation) return; // If user cancels, do nothing
  const index = cartItems_array.findIndex(item => item.name === _itemName);
  if (index !== -1) {
    cartItems_array.splice(index, 1); // Remove item
    count--;
    localStorage.setItem('cart-item-list', JSON.stringify(cartItems_array));
    const cartCountElement = document.getElementById("cartcount");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
    render();
  }
}

