import './input.css'

window.navigateTo = function(page) {
  if (page === 'catalog') {
    window.location.href = '/catalog.html'
  } else if (page === 'cabinet') {
    console.log('Navigate to cabinet')
  } else if (page === 'home') {
    window.location.href = '/'
  } else if (page === 'checkout') {
    window.location.href = '/checkout.html'
  }
}

window.toggleCart = function() {
  const cart = document.getElementById('side-cart')
  if (!cart) return
  
  if (cart.classList.contains('cart-open')) {
    cart.classList.remove('cart-open')
    document.body.style.overflow = ''
  } else {
    cart.classList.add('cart-open')
    document.body.style.overflow = 'hidden'
  }
}

window.openProduct = function(productId) {
  window.location.href = '/product-aurelius.html'
}

// Cart management
function getCart() {
  const saved = localStorage.getItem('cart')
  return saved ? JSON.parse(saved) : []
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

let cart = getCart()

window.addToCart = function(name, price) {
  // Get product image from the page
  const mainImg = document.getElementById('main-prod-img')
  let imageUrl = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200'
  if (mainImg) {
    imageUrl = mainImg.src.replace('w=1000', 'w=200').replace('q=80&w=1000', 'q=80&w=200')
  }
  
  // Get material from the page - look for the italic text with material info
  const materialText = document.querySelector('.text-stone-400.italic.leading-relaxed')
  const material = materialText ? materialText.textContent.split('.')[0].trim() : 'Французское Букле'
  
  const product = {
    id: Date.now(),
    name: name,
    price: price,
    image: imageUrl,
    material: material
  }
  
  cart.push(product)
  saveCart(cart)
  updateCartDisplay()
  toggleCart()
}

window.removeFromCart = function(index) {
  cart.splice(index, 1)
  saveCart(cart)
  updateCartDisplay()
  updateCheckoutDisplay()
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items')
  const cartTotal = document.getElementById('cart-total')
  const cartBadge = document.getElementById('cart-badge')
  
  if (!cartItems || !cartTotal) return
  
  // Update badge
  if (cartBadge) {
    cartBadge.textContent = cart.length
  }
  
  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  cartTotal.textContent = total.toLocaleString('ru-RU') + ' ₽'
  
  // Update items list
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-[10px] uppercase tracking-widest text-stone-400 text-center py-20">Ваша корзина пока пуста</p>'
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="flex gap-6 animate-slide-up">
        <div class="w-20 h-20 bg-stone-100 shrink-0">
          <img src="${item.image}" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow">
          <h5 class="text-xs font-medium uppercase tracking-widest">${item.name}</h5>
          <p class="text-[10px] text-stone-400 mt-1 italic">${item.material}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-xs">${item.price.toLocaleString('ru-RU')}&nbsp;₽</span>
            <button onclick="removeFromCart(${index})" class="text-[9px] uppercase tracking-widest border-b border-stone-200">Удалить</button>
          </div>
        </div>
      </div>
    `).join('')
  }
  
  // Also update checkout page if it exists
  updateCheckoutDisplay()
}

function updateCheckoutDisplay() {
  const checkoutSummary = document.getElementById('checkout-summary')
  const checkoutTotal = document.getElementById('checkout-total')
  
  if (!checkoutSummary || !checkoutTotal) return
  
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const prepayment = Math.round(total * 0.5) // 50% предоплата
  checkoutTotal.textContent = prepayment.toLocaleString('ru-RU') + ' ₽'
  
  if (cart.length === 0) {
    checkoutSummary.innerHTML = '<p class="text-[10px] uppercase tracking-widest text-stone-400 text-center py-10">Корзина пуста</p>'
  } else {
    checkoutSummary.innerHTML = cart.map((item) => `
      <div class="flex justify-between text-[11px] uppercase tracking-widest">
        <span class="text-stone-400">${item.name}</span>
        <span>${item.price.toLocaleString('ru-RU')}&nbsp;₽</span>
      </div>
    `).join('')
  }
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
  cart = getCart()
  updateCartDisplay()
  updateCheckoutDisplay()
})

