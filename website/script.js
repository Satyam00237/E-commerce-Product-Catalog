// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone Pro",
    price: 58099,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "electronics",
    description: "Latest smartphone with advanced camera and long battery life"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 10789,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    category: "electronics",
    description: "Premium wireless earbuds with noise cancellation"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 20749,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "electronics",
    description: "Fitness tracker with heart rate monitor and GPS"
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 107899,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "electronics",
    description: "High-performance laptop for professionals"
  },
  {
    id: 5,
    name: "Tablet Pro",
    price: 41499,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    category: "electronics",
    description: "Versatile tablet with stylus support"
  },
  {
    id: 6,
    name: "Organic Apples",
    price: 248,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "grocery",
    description: "Fresh organic apples from local farms"
  },
  {
    id: 7,
    name: "Whole Grain Bread",
    price: 289,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    category: "grocery",
    description: "Artisan whole grain bread"
  },
  {
    id: 8,
    name: "Organic Milk",
    price: 414,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    category: "grocery",
    description: "Fresh organic milk from grass-fed cows"
  },
  {
    id: 9,
    name: "Fresh Eggs",
    price: 497,
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc",
    category: "grocery",
    description: "Farm-fresh organic eggs"
  },
  {
    id: 10,
    name: "Organic Coffee",
    price: 1078,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "grocery",
    description: "Premium organic coffee beans"
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 4149,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "accessories",
    description: "Genuine leather wallet with multiple compartments"
  },
  {
    id: 12,
    name: "Sunglasses",
    price: 7469,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666",
    category: "accessories",
    description: "UV protection sunglasses with polarized lenses"
  },
  {
    id: 13,
    name: "Smart Backpack",
    price: 6639,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "accessories",
    description: "Water-resistant backpack with USB charging port"
  },
  {
    id: 14,
    name: "Wireless Headphones",
    price: 2489,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    category: "accessories",
    description: "Best wireless headphones for music lovers"
  },
  {
    id: 15,
    name: "Portable Speaker",
    price: 4979,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    category: "accessories",
    description: "Waterproof Bluetooth speaker with 12-hour battery"
  }
];

// User Authentication
let currentUser = null;

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmount = document.getElementById('total-amount');
const categoryButtons = document.querySelectorAll('.category-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const cartModal = document.getElementById('cart-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderItems = document.getElementById('order-items');
const finalTotal = document.getElementById('final-total');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authButtons = document.querySelector('.header-buttons');

// Cart state
let cart = [];
let currentCategory = 'all';

// Initialize the application
function init() {
  displayProducts();
  setupEventListeners();
  updateCart();
  initAuth();
}

// Show cart modal
function showCart() {
  cartModal.style.display = 'block';
  updateCart();
}

// Toggle cart modal
function toggleCart() {
  if (cartModal.style.display === 'block') {
    cartModal.style.display = 'none';
  } else {
    cartModal.style.display = 'block';
    updateCart();
  }
}

// Close cart modal
function closeCart() {
  cartModal.style.display = 'none';
}

// Display products based on current category
function displayProducts() {
  productList.innerHTML = '';
  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(product => product.category === currentCategory);

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="description">${product.description}</p>
    <p class="price">Rs. ${product.price.toFixed(2)}</p>
    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  return card;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showSuccessMessage('Item added to cart!');
}

// Show success message
function showSuccessMessage(message) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = message;
  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="item-info">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h4>${item.name}</h4>
            <p class="item-price">Rs. ${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="item-total">
          <span>Rs. ${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
      totalItems += item.quantity;
    });
  }

  // Update cart count
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }

  // Update total amount
  const totalAmountElement = document.getElementById('total-amount');
  if (totalAmountElement) {
    totalAmountElement.textContent = `Rs. ${total.toFixed(2)}`;
  }
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Close checkout modal
function closeCheckout() {
  checkoutModal.style.display = 'none';
}

// Show checkout modal
function showCheckoutModal() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  if (!currentUser) {
    alert('Please login to proceed with checkout');
    showLoginModal();
    return;
  }
  
  cartModal.style.display = 'none';
  checkoutModal.style.display = 'block';
  
  orderItems.innerHTML = '';
  cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="order-item-details">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-quantity">x${item.quantity}</span>
      </div>
      <span class="order-item-price">Rs. ${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderItems.appendChild(orderItem);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  finalTotal.textContent = `Rs. ${total.toFixed(2)}`;
}

// Process order
function processOrder(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !phone || !address) {
    alert('Please fill in all fields');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    customer: {
      name: name,
      email: currentUser.email,
      phone: phone,
      address: address
    },
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    })),
    totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  const orderConfirmation = document.createElement('div');
  orderConfirmation.className = 'order-confirmation';
  orderConfirmation.innerHTML = `
    <div class="confirmation-content">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase, ${name}!</p>
      <p>Your order will be delivered to:</p>
      <p>${address}</p>
      <p>We'll contact you at: ${phone}</p>
      <p>Order ID: ${order.id}</p>
      <p>Total Amount: Rs. ${finalTotal.textContent.replace('Rs. ', '')}</p>
      <button onclick="closeConfirmation()" class="close-confirmation">Close</button>
    </div>
  `;
  
  document.body.appendChild(orderConfirmation);
  
  cart = [];
  updateCart();
  closeCheckout();
  checkoutForm.reset();
}

// Close confirmation message
function closeConfirmation() {
  const confirmation = document.querySelector('.order-confirmation');
  if (confirmation) {
    confirmation.remove();
  }
}

// View order history
function viewOrderHistory() {
  if (!currentUser) {
    alert('Please login to view order history');
    showLoginModal();
    return;
  }

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  if (orders.length === 0) {
    alert('No order history found');
    return;
  }

  const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));

  const orderHistory = document.createElement('div');
  orderHistory.className = 'order-history';
  orderHistory.innerHTML = `
    <div class="order-history-content">
      <h2>Order History</h2>
      <div class="orders-list">
        ${sortedOrders.map(order => `
          <div class="order-item">
            <h3>Order #${order.id}</h3>
            <p>Date: ${new Date(order.date).toLocaleString()}</p>
            <p>Customer: ${order.customer.name}</p>
            <p>Total: Rs. ${order.totalAmount.toFixed(2)}</p>
            <button onclick="viewOrderDetails(${order.id})">View Details</button>
          </div>
        `).join('')}
      </div>
      <button onclick="closeOrderHistory()" class="close-history">Close</button>
    </div>
  `;
  
  document.body.appendChild(orderHistory);
}

// View order details
function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    alert('Order not found');
    return;
  }

  const orderDetails = document.createElement('div');
  orderDetails.className = 'order-details';
  orderDetails.innerHTML = `
    <div class="order-details-content">
      <h2>Order Details #${order.id}</h2>
      <p>Date: ${new Date(order.date).toLocaleString()}</p>
      <h3>Customer Information</h3>
      <p>Name: ${order.customer.name}</p>
      <p>Phone: ${order.customer.phone}</p>
      <p>Address: ${order.customer.address}</p>
      <h3>Order Items</h3>
      <div class="order-items-list">
        ${order.items.map(item => `
          <div class="order-item-detail">
            <p>${item.name} x ${item.quantity}</p>
            <p>Rs. ${item.total.toFixed(2)}</p>
          </div>
        `).join('')}
      </div>
      <h3>Total Amount: Rs. ${order.totalAmount.toFixed(2)}</h3>
      <button onclick="closeOrderDetails()" class="close-details">Close</button>
    </div>
  `;
  
  document.body.appendChild(orderDetails);
}

// Close order history
function closeOrderHistory() {
  const orderHistory = document.querySelector('.order-history');
  if (orderHistory) {
    orderHistory.remove();
  }
}

// Close order details
function closeOrderDetails() {
  const orderDetails = document.querySelector('.order-details');
  if (orderDetails) {
    orderDetails.remove();
  }
}

// Show Login Modal
function showLoginModal() {
  loginModal.style.display = 'block';
  signupModal.style.display = 'none';
  // Clear login form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

// Close Login Modal
function closeLoginModal() {
  loginModal.style.display = 'none';
  // Clear login form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

// Show Signup Modal
function showSignupModal() {
  signupModal.style.display = 'block';
  loginModal.style.display = 'none';
  // Clear signup form fields
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm-password').value = '';
}

// Close Signup Modal
function closeSignupModal() {
  signupModal.style.display = 'none';
  // Clear signup form fields
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm-password').value = '';
}

// Switch to Signup
function switchToSignup() {
  closeLoginModal();
  showSignupModal();
}

// Switch to Login
function switchToLogin() {
  closeSignupModal();
  showLoginModal();
}

// Handle Login
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = {
      name: user.name,
      email: user.email
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    closeLoginModal();
    showSuccessMessage('Login successful!');
  } else {
    alert('Invalid email or password');
  }
}

// Handle Signup
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if (users.some(u => u.email === email)) {
    alert('Email already registered');
    return;
  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Auto-login after successful signup
  currentUser = {
    name: newUser.name,
    email: newUser.email
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateAuthUI();
  
  showSuccessMessage('Signup successful!');
  closeSignupModal();
}

// Update Authentication UI
function updateAuthUI() {
  const headerButtons = document.querySelector('.header-buttons');
  if (currentUser) {
    headerButtons.innerHTML = `
      <div class="user-profile" onclick="toggleDropdown()">
        <i class="fas fa-user-circle"></i>
        <span>${currentUser.name}</span>
        <div class="dropdown-menu">
          <button onclick="viewOrderHistory()">
            <i class="fas fa-history"></i>
            Order History
          </button>
          <button onclick="logout()">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
      <button class="cart-icon" onclick="showCart()">
        <i class="fas fa-shopping-cart"></i>
        <span id="cart-count">0</span>
      </button>
    `;
  } else {
    headerButtons.innerHTML = `
      <button class="login-btn" onclick="showLoginModal()">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="cart-icon" onclick="showCart()">
        <i class="fas fa-shopping-cart"></i>
        <span id="cart-count">0</span>
      </button>
    `;
  }
}

// Toggle Dropdown Menu
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-profile')) {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  }
});

// Handle Logout
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  showSuccessMessage('Logged out successfully');
  // Clear all form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm-password').value = '';
}

// Initialize Authentication
function initAuth() {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  updateAuthUI();
}

// Setup event listeners
function setupEventListeners() {
  // Category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.dataset.category;
      displayProducts();
    });
  });

  // Checkout button
  checkoutBtn.addEventListener('click', showCheckoutModal);

  // Checkout form
  checkoutForm.addEventListener('submit', processOrder);

  // Login form
  loginForm.addEventListener('submit', handleLogin);

  // Signup form
  signupForm.addEventListener('submit', handleSignup);

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      closeCart();
    }
    if (e.target === checkoutModal) {
      closeCheckout();
    }
    if (e.target === loginModal) {
      closeLoginModal();
    }
    if (e.target === signupModal) {
      closeSignupModal();
    }
  });

  // Close modals when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartModal.style.display === 'block') {
        closeCart();
      }
      if (checkoutModal.style.display === 'block') {
        closeCheckout();
      }
      if (loginModal.style.display === 'block') {
        closeLoginModal();
      }
      if (signupModal.style.display === 'block') {
        closeSignupModal();
      }
    }
  });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
  
