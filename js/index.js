// open / close nav and cart

document.addEventListener('DOMContentLoaded', (event) => {
  // Cart elements
  const orderIcon = document.getElementById('order-icon');
  const popoutCart = document.getElementById('popout-cart');
  const closeCartButton = document.getElementById('close-cart');

  // Popout menu elements
  const menuIcon = document.getElementById('menu-icon');
  const popoutMenu = document.getElementById('popout-menu');
  const closeMenuIcon = document.getElementById('close-menu');
  const overlay = document.getElementById('overlay');

  // Order icon event listener
  orderIcon.addEventListener('click', () => {
    console.log('Order icon clicked');
    popoutCart.classList.toggle('.show');
    overlay.classList.toggle('.show');
  });

  // Close cart button event listener
  closeCartButton.addEventListener('click', () => {
    console.log('Close cart button clicked');
    popoutCart.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Menu icon event listener
  menuIcon.addEventListener('click', () => {
    console.log('Menu icon clicked');
    popoutMenu.classList.toggle('.show');
    overlay.classList.toggle('.show');
  });

  // Close menu icon event listener
  closeMenuIcon.addEventListener('click', () => {
    console.log('Close menu icon clicked');
    popoutMenu.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Overlay event listener
  overlay.addEventListener('click', () => {
    console.log('Overlay clicked');
    popoutMenu.classList.remove('show');
    popoutCart.classList.remove('show');
    overlay.classList.remove('show');
  });
});


// Nav bar transparency
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector('nav');

  function handleScroll() {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  // Trigger the scroll event once to set the initial state
  handleScroll();
});


