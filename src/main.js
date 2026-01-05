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
  console.log('Toggle cart')
}

window.openProduct = function(productId) {
  console.log('Opening product:', productId)
  window.location.href = '/product-aurelius.html'
}

// Убеждаемся, что функция доступна глобально
document.addEventListener('DOMContentLoaded', () => {
  console.log('openProduct function available:', typeof window.openProduct)
})

