/**
 * بيت الجملة - E-commerce Cart and Search Functionality
 * Includes: Add to Cart, Remove, Quantity Update, Notifications, Mobile Menu, Search
 */

// Product database
const PRODUCTS = [
  // Beverages
  { id: 'bev-001', name: 'مياه معدنية', price: 5, image: 'images/water.jpg', category: 'beverages' },
  { id: 'bev-002', name: 'عصير برتقال', price: 25, image: 'images/juice.jpg', category: 'beverages' },
  { id: 'bev-003', name: 'شاي', price: 40, image: 'images/tea.jpg', category: 'beverages' },
  { id: 'bev-004', name: 'قهوة', price: 60, image: 'images/coffee.jpg', category: 'beverages' },
  // Meat and Poultry
  { id: 'mp-001', name: 'لحم بقري', price: 220, image: 'images/beef.jpg', category: 'meat-poultry' },
  { id: 'mp-002', name: 'فراخ كاملة', price: 65, image: 'images/chicken.jpg', category: 'meat-poultry' },
  { id: 'mp-003', name: 'كبدة', price: 90, image: 'images/liver.jpg', category: 'meat-poultry' },
  { id: 'mp-004', name: 'لحم مفروم', price: 180, image: 'images/minced-meat.jpg', category: 'meat-poultry' },
  { id: 'mp-005', name: 'ديوك رومي', price: 95, image: 'images/turkey.jpg', category: 'meat-poultry' },
  { id: 'mp-006', name: 'سجق', price: 110, image: 'images/sausage.jpg', category: 'meat-poultry' },
  // Cleaning
  { id: 'cln-001', name: 'صابون أطباق', price: 15, image: 'images/detergent.jpg', category: 'cleaning' },
  { id: 'cln-002', name: 'مسحوق غسيل', price: 55, image: 'images/laundry.jpg', category: 'cleaning' },
  { id: 'cln-003', name: 'مطهر أرضيات', price: 35, image: 'images/floor-cleaner.jpg', category: 'cleaning' },
  { id: 'cln-004', name: 'صابون يدين', price: 20, image: 'images/hand-wash.jpg', category: 'cleaning' },
  { id: 'cln-005', name: 'مطهر حمامات', price: 30, image: 'images/toilet-cleaner.jpg', category: 'cleaning' },
  { id: 'cln-006', name: 'منظف زجاج', price: 25, image: 'images/glass-cleaner.jpg', category: 'cleaning' },
  // Fruits and Veggies
  { id: 'fv-001', name: 'تفاح أحمر', price: 25, image: 'images/apple.jpg', category: 'fruits-veggies' },
  { id: 'fv-002', name: 'موز', price: 15, image: 'images/banana.jpg', category: 'fruits-veggies' },
  { id: 'fv-003', name: 'طماطم', price: 12, image: 'images/tomato.jpg', category: 'fruits-veggies' },
  { id: 'fv-004', name: 'برتقال', price: 18, image: 'images/orange.jpg', category: 'fruits-veggies' },
  { id: 'fv-005', name: 'بطاطس', price: 10, image: 'images/potato.jpg', category: 'fruits-veggies' },
  { id: 'fv-006', name: 'خيار', price: 14, image: 'images/cucumber.jpg', category: 'fruits-veggies' },
  // Dairy
  { id: 'dry-001', name: 'لبن زبادي', price: 8, image: 'images/milk.jpg', category: 'dairy' },
  { id: 'dry-002', name: 'جبنة رومي', price: 120, image: 'images/cheese.jpg', category: 'dairy' },
  { id: 'dry-003', name: 'زبدة', price: 45, image: 'images/butter.jpg', category: 'dairy' },
  { id: 'dry-004', name: 'زبادي', price: 6, image: 'images/yogurt.jpg', category: 'dairy' },
  { id: 'dry-005', name: 'قشطة', price: 30, image: 'images/cream.jpg', category: 'dairy' },
  { id: 'dry-006', name: 'جبنة بيضاء', price: 40, image: 'images/white-cheese.jpg', category: 'dairy' },
  // Bakery
  { id: 'bky-001', name: 'خبز بلدي', price: 2, image: 'images/bread.jpg', category: 'bakery' },
  { id: 'bky-002', name: 'كعك', price: 30, image: 'images/cake.jpg', category: 'bakery' },
  { id: 'bky-003', name: 'بسكويت', price: 25, image: 'images/cookies.jpg', category: 'bakery' },
  { id: 'bky-004', name: 'كرواسون', price: 15, image: 'images/croissant.jpg', category: 'bakery' },
  { id: 'bky-005', name: 'فطيرة', price: 35, image: 'images/pie.jpg', category: 'bakery' },
  { id: 'bky-006', name: 'خبز فرنسي', price: 10, image: 'images/baguette.jpg', category: 'bakery' }
];

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded - DOM ready');
  
  // Initialize empty cart if none exists
  initializeCart();
  
  // Update cart count on page load
  updateCartCount();
  
  // Setup all event listeners
  setupEventListeners();
  
  // Render search results if on search-results page
  if (document.querySelector('.products-page') && document.location.pathname.includes('search-results.html')) {
    renderSearchResults();
  }
  
  // Debug: Log initial cart state
  logCartContents();
});

// CART FUNCTIONS ==============================================

function initializeCart() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
    console.log('Cart initialized in localStorage');
  }
}

function setupEventListeners() {
  // Add to Cart buttons
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      handleAddToCart(e.target);
    }
  });

  // Cart page specific listeners
  if (document.querySelector('.cart-page')) {
    document.querySelector('.cart-items').addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-btn')) {
        handleRemoveItem(e.target);
      } else if (e.target.classList.contains('quantity-btn')) {
        handleQuantityChange(e.target);
      }
    });

    document.querySelector('.checkout-btn')?.addEventListener('click', handleCheckout);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      }
    });
  });

  // Search bar
  document.querySelectorAll('.search-bar').forEach(searchBar => {
    searchBar.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        searchProducts(this.value.trim());
      }
    });
  });

  // Form submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

// SEARCH FUNCTIONS ============================================

function searchProducts(query) {
  const results = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
  
  localStorage.setItem('searchResults', JSON.stringify(results));
  window.location.href = 'search-results.html';
}

function renderSearchResults() {
  const results = JSON.parse(localStorage.getItem('searchResults') || '[]');
  const productsGrid = document.querySelector('.products-grid');
  const noResultsMessage = document.querySelector('.no-results-message');
  
  if (results.length === 0) {
    noResultsMessage.style.display = 'block';
    productsGrid.innerHTML = '';
    return;
  }
  
  noResultsMessage.style.display = 'none';
  
  let html = '';
  results.forEach(product => {
    html += `
      <div class="product-card" data-category="${product.category}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">${product.price} ج.م</p>
        <button class="add-to-cart"
                data-id="${product.id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-image="${product.image}">
          أضف للسلة
        </button>
      </div>
    `;
  });
  
  productsGrid.innerHTML = html;
}

// PRODUCT HANDLERS ============================================

function handleAddToCart(button) {
  const productCard = button.closest('.product-card');
  
  let price;
  try {
    if (button.dataset.price) {
      price = parseFloat(button.dataset.price);
    } else {
      const priceElement = productCard.querySelector('.product-price') || productCard.querySelector('p');
      const priceText = priceElement.textContent.match(/[\d.]+/)[0];
      price = parseFloat(priceText);
    }
    if (isNaN(price)) throw new Error('Invalid price');
  } catch (e) {
    console.error('Error parsing price:', e);
    price = 0;
    showNotification('خطأ في استرجاع سعر المنتج');
  }

  const product = {
    id: button.dataset.id || generateUniqueId(),
    name: button.dataset.name || productCard.querySelector('h3').textContent,
    price: price,
    image: button.dataset.image || productCard.querySelector('img').src,
    category: productCard.dataset.category || 'uncategorized',
    quantity: 1
  };

  addToCart(product);
}

function handleRemoveItem(button) {
  const cartItem = button.closest('.cart-item');
  const productId = cartItem.dataset.id;
  removeFromCart(productId);
}

function handleQuantityChange(button) {
  const cartItem = button.closest('.cart-item');
  const quantityElement = cartItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent);
  
  if (button.classList.contains('plus')) {
    quantity++;
  } else if (button.classList.contains('minus')) {
    quantity = Math.max(1, quantity - 1);
  }
  
  updateQuantity(cartItem.dataset.id, quantity);
}

// CORE CART OPERATIONS ========================================

function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart(cart);
  updateCartCount();
  showNotification(`${product.name} تمت إضافته إلى السلة`);
  logCartContents();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  
  if (document.querySelector('.cart-page')) {
    renderCartItems();
  }
  
  updateCartCount();
  showNotification('تمت إزالة المنتج من السلة');
  logCartContents();
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
    
    if (document.querySelector('.cart-page')) {
      renderCartItems();
    }
    
    updateCartCount();
    logCartContents();
  }
}

// CART RENDERING ==============================================

function renderCartItems() {
  const cart = getCart();
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  const cartSummary = document.querySelector('.cart-summary');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'block';
    }
    
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
    
    return;
  }
  
  if (emptyCartMessage) {
    emptyCartMessage.style.display = 'none';
  }
  
  let itemsHTML = `
    <div class="cart-header">
      <span>المنتج</span>
      <span>السعر</span>
      <span>الكمية</span>
      <span>المجموع</span>
    </div>
  `;
  
  cart.forEach(item => {
    itemsHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="product-info">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
          <div class="product-details">
            <h3>${item.name}</h3>
            <span class="product-category">${item.category}</span>
            <button class="remove-btn">إزالة</button>
          </div>
        </div>
        <span class="product-price">${item.price.toFixed(2)} ج.م</span>
        <div class="quantity-control">
          <button class="quantity-btn minus">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus">+</button>
        </div>
        <span class="product-total">${(item.price * item.quantity).toFixed(2)} ج.م</span>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = itemsHTML;
  updateCartSummary();
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  
  document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = 
    subtotal.toFixed(2) + ' ج.م';
  document.querySelector('.summary-row.total span:last-child').textContent = 
    total.toFixed(2) + ' ج.م';
}

// HELPER FUNCTIONS ============================================

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalItems > 0 ? totalItems : '';
    el.style.display = totalItems > 0 ? 'inline-block' : 'none';
  });
}

function showNotification(message) {
  document.querySelectorAll('.notification').forEach(el => el.remove());
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function handleCheckout() {
  alert('شكراً لشرائك! سيتم تجهيز طلبك قريباً.');
  localStorage.setItem('cart', JSON.stringify([]));
  renderCartItems();
  updateCartCount();
  logCartContents();
}

function handleFormSubmit(e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#e74c3c';
      isValid = false;
    } else {
      input.style.borderColor = '#ddd';
    }
  });
  
  if (isValid) {
    showNotification('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
    this.reset();
  } else {
    showNotification('الرجاء ملء جميع الحقول المطلوبة');
  }
}

// DEBUGGING TOOLS =============================================

function logCartContents() {
  console.log('Current Cart:', getCart());
}

function generateUniqueId() {
  return 'prod-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Initialize cart rendering if on cart page
if (document.querySelector('.cart-page')) {
  renderCartItems();
}
// Login-related functions to add to script.js

function showNotification(message, isError = false) {
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'error' : ''}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

async function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    showNotification('تم تسجيل الدخول بنجاح');
    updateAuthUI(data.username);
  } catch (err) {
    showNotification(err.message, true);
  }
}

async function handleSignup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    showNotification('تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  } catch (err) {
    showNotification(err.message, true);
  }
}

async function handleLogout() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Logout failed');
    }
    showNotification('تم تسجيل الخروج بنجاح');
    updateAuthUI(null);
  } catch (err) {
    showNotification(err.message, true);
  }
}

async function checkLoginStatus() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    if (response.ok) {
      updateAuthUI(data.username);
    } else {
      updateAuthUI(null);
    }
  } catch (err) {
    updateAuthUI(null);
  }
}

function updateAuthUI(username) {
  const loginForm = document.getElementById('login-form');
  const userInfo = document.getElementById('user-info');
  const loggedInUser = document.getElementById('logged-in-user');
  const logoutLink = document.getElementById('logout-link');

  if (username) {
    loginForm.style.display = 'none';
    userInfo.style.display = 'block';
    loggedInUser.textContent = `مرحبًا، ${username}`;
    logoutLink.style.display = 'list-item';
  } else {
    loginForm.style.display = 'flex';
    userInfo.style.display = 'none';
    loggedInUser.textContent = '';
    logoutLink.style.display = 'none';
  }
}

// Add to existing DOMContentLoaded listener or create new
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
  // Add your existing event listeners here, e.g., for cart or search
});