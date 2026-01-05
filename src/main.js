import './input.css'

window.navigateTo = function(page) {
  if (page === 'catalog') {
    window.location.href = '/catalog.html'
  } else if (page === 'cabinet') {
    console.log('Navigate to cabinet')
  } else if (page === 'home') {
    window.location.href = '/'
  }
}

window.toggleCart = function() {
  const cart = document.getElementById('side-cart')
  if (!cart) return
  cart.classList.toggle('hidden')
}

window.openProduct = function(productId) {
  window.location.href = '/product-aurelius.html'
}

