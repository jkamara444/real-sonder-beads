

// tell Barba to use the css plugin
barba.use(barbaCss);

// init Barba
barba.init({
  transitions: [
    {
      name: 'fade',
      to: {
        namespace: ['home'] // Adjust if you have specific page namespaces
      },
      once() {
        console.log('Transition started');
      },
      leave() {
        console.log('Leaving page');
      },
      enter() {
        console.log('Entering page');
      }
    }
  ]
});


// open and close popout nav and cart 

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    orderIcon: document.getElementById("order-icon"),
    popoutCart: document.getElementById("popout-cart"),
    closeCartButton: document.getElementById("close-cart"),
    addToCartButtons: document.querySelectorAll(".addcart"),
    menuIcon: document.getElementById("menu-icon"),
    popoutMenu: document.getElementById("popout-menu"),
    closeMenuIcon: document.getElementById("close-menu"),
    overlay: document.getElementById("overlay")
  };

  const toggleVisibility = (element) => {
    element.classList.toggle("show");
    elements.overlay.classList.toggle("show");
  };

  if (elements.orderIcon) {
    elements.orderIcon.addEventListener("click", () => toggleVisibility(elements.popoutCart));
  }

  if (elements.closeCartButton) {
    elements.closeCartButton.addEventListener("click", () => {
      elements.popoutCart.classList.remove("show");
      elements.overlay.classList.remove("show");
    });
  }

  if (elements.menuIcon) {
    elements.menuIcon.addEventListener("click", () => toggleVisibility(elements.popoutMenu));
  }

  if (elements.closeMenuIcon) {
    elements.closeMenuIcon.addEventListener("click", () => {
      elements.popoutMenu.classList.remove("show");
      elements.overlay.classList.remove("show");
    });
  }

  if (elements.overlay) {
    elements.overlay.addEventListener("click", () => {
      elements.popoutMenu.classList.remove("show");
      elements.popoutCart.classList.remove("show");
      elements.overlay.classList.remove("show");
    });
  }

  if (elements.addToCartButtons.length > 0) {
    elements.addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        elements.popoutCart.classList.add("show");
        elements.overlay.classList.add("show");
      });
    });
  }
});



//  nav sticky and transparency
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const placeholder = document.getElementById('nav-placeholder');
  const sticky = navbar.offsetTop;

  window.addEventListener('scroll', () => {
    placeholder.style.height = window.scrollY >= sticky ? navbar.offsetHeight + 'px' : '0px';
    navbar.classList.toggle('sticky', window.scrollY >= sticky);
  });
});

// policies open close

document.addEventListener('DOMContentLoaded', () => {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqContent = header.nextElementSibling;
      const isActive = faqContent.style.maxHeight !== '';

      document.querySelectorAll('.faq-content').forEach(content => {
        content.style.maxHeight = '';
      });

      faqContent.style.maxHeight = isActive ? '' : `${faqContent.scrollHeight}px`;
    });
  });
});

// filter and sort

document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.getElementById("filter-button");
  const sortButton = document.getElementById('sort-button');
  const items = document.querySelectorAll(".product-row .product");

  filterButton.addEventListener("change", () => filterItems(filterButton.value));

  function filterItems(category) {
    items.forEach(item => {
      const itemCategory = item.getAttribute("data-category");
      item.style.display = (category === "all" || category === itemCategory) ? "block" : "none";
    });
  }

  sortButton.addEventListener('change', () => {
    const sortOption = sortButton.value;
    const productsContainer = document.querySelector('.product-row');
    const productsArray = Array.from(productsContainer.querySelectorAll('.product'));

    productsArray.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('h4').innerText.replace('$', ''));
      const priceB = parseFloat(b.querySelector('h4').innerText.replace('$', ''));

      return (sortOption === 'low-high') ? priceA - priceB : (sortOption === 'high-low') ? priceB - priceA : 0;
    });

    productsContainer.innerHTML = '';
    productsArray.forEach(product => productsContainer.appendChild(product));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const typeSelect = document.querySelector('#product-1 #type');
  const priceElement = document.querySelector('#product-1 .unit-price');

  typeSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const unitPrice = parseFloat(selectedOption.getAttribute('data-price'));
    priceElement.textContent = `$${unitPrice.toFixed(2)}`;
  });
});


function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
  sessionStorage.setItem('popupShown', 'true');
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

document.getElementById('close-button').addEventListener('click', closePopup);

window.onload = function () {
  if (!sessionStorage.getItem('popupShown')) {
    setTimeout(showPopup, 4000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.addcart');
  const subtotalElement = document.querySelector('.totalamt h4');
  const cartCountElement = document.querySelector('#order-icon span');
  const popoutCart = document.querySelector('#popout-cart');
  const overlay = document.querySelector('#overlay');

  function updateCart(item) {
    const minusButton = item.querySelector('.minus');
    const plusButton = item.querySelector('.plus');
    const quantityElement = item.querySelector('.quantity');
    const cartTotalElement = item.querySelector('.carttotal');
    const unitPriceElement = item.querySelector('.unit-price');
    let unitPrice = parseFloat(unitPriceElement.textContent.replace('$', ''));

    function updateQuantity(change) {
      let quantity = parseInt(quantityElement.textContent) + change;
      if (quantity <= 0) {
        item.remove();
        updateSubtotal();
        updateCartCount();
        updateLocalStorage();
        return;
      }
      quantityElement.textContent = quantity;
      cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
      updateSubtotal();
      updateCartCount();
      updateLocalStorage();
    }

    minusButton.addEventListener('click', () => updateQuantity(-1));
    plusButton.addEventListener('click', () => updateQuantity(1));

    const showNoteLink = item.querySelector('.show-note');
    if (showNoteLink) {
      showNoteLink.addEventListener('click', () => {
        const noteParagraph = item.querySelector('.note');
        if (noteParagraph) {
          noteParagraph.style.display = noteParagraph.style.display === 'none' ? 'block' : 'none';
          showNoteLink.textContent = noteParagraph.style.display === 'none' ? 'Show Note' : 'Hide Note';
        }
      });
    }
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.item-text-container');
      const productName = parentItem.querySelector('h2').innerText;
      const selectedColor = parentItem.querySelector('#color')?.value || 'N/A';
      const selectedSize = parentItem.querySelector('#size')?.value + ' in' || 'N/A';
      const selectedTypeElement = parentItem.querySelector('#type');
      const selectedType = selectedTypeElement.value || 'N/A';
      const customNote = parentItem.querySelector('#note')?.value || 'N/A';
      const unitPrice = parseFloat(selectedTypeElement.selectedOptions[0].getAttribute('data-price'));
      const firstImageSrc = document.querySelector('#main-carousel .splide__slide img').src;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cartlist');
      cartItem.innerHTML = `
              <div class="cartimg">
                  <img src="${firstImageSrc}" alt="${productName}">
              </div>
              <div class="cartdetails">
                  <div class="cartname">${productName}</div>
                  <div class="item-description">
                      ${selectedColor !== 'N/A' ? `<p class="color">${selectedColor}</p>` : ''}
                      ${selectedSize !== 'N/A' ? `<p class="size">${selectedSize}</p>` : ''}
                      ${selectedType !== 'N/A' ? `<p class="type">Type: ${selectedType}</p>` : ''}
                      ${customNote !== 'N/A' ? `
                          <a href="#" class="show-note">Show Note</a>
                          <p class="note" style="display: none;">${customNote}</p>
                      ` : ''}
                  </div>
                  <div class="cartquantity">
                      <span class="minus">&lt;</span>
                      <span class="quantity">1</span>
                      <span class="plus">&gt;</span>
                  </div>
              </div>
              <div class="carttotal" data-unit-price="${unitPrice.toFixed(2)}">$${unitPrice.toFixed(2)}</div>
              <div class="unit-price" style="display: none;">$${unitPrice.toFixed(2)}</div>
          `;

      const cartContainer = document.querySelector('#popout-cart .carttab');
      cartContainer.appendChild(cartItem);

      updateCart(cartItem);
      updateSubtotal();
      updateCartCount();
      updateLocalStorage();

      popoutCart.classList.add('show');
      overlay.classList.add('show');
    });
  });

  document.querySelectorAll('.item-type').forEach(select => {
    select.addEventListener('change', (event) => {
      const selectedOption = event.target.selectedOptions[0];
      const unitPrice = parseFloat(selectedOption.getAttribute('data-price'));
      const parentItem = event.target.closest('.item-text-container');
      const priceElement = parentItem.querySelector('h4');
      priceElement.textContent = `$${unitPrice.toFixed(2)}`;
    });
  });

  function updateSubtotal() {
    let subtotal = 0;
    document.querySelectorAll('.carttotal').forEach(cartTotalElement => {
      subtotal += parseFloat(cartTotalElement.textContent.replace('$', ''));
    });
    subtotalElement.textContent = `$${subtotal.toFixed(2)} USD`;
  }

  function updateCartCount() {
    let totalItems = 0;
    document.querySelectorAll('.cartlist').forEach(cartItem => {
      const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
      totalItems += quantity;
    });
    cartCountElement.textContent = totalItems;
  }

  function updateLocalStorage() {
    const cartItems = [];
    document.querySelectorAll('.cartlist').forEach(cartItem => {
      const productName = cartItem.querySelector('.cartname').textContent;
      const selectedColor = cartItem.querySelector('.item-description .color')?.textContent || '';
      const selectedSize = cartItem.querySelector('.item-description .size')?.textContent || '';
      const selectedType = cartItem.querySelector('.item-description .type')?.textContent || '';
      const customNote = cartItem.querySelector('.item-description .note')?.textContent || '';
      const unitPrice = parseFloat(cartItem.querySelector('.carttotal').getAttribute('data-unit-price'));
      const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
      const firstImageSrc = cartItem.querySelector('.cartimg img').src;

      cartItems.push({
        productName,
        selectedColor,
        selectedSize,
        selectedType,
        customNote,
        unitPrice,
        quantity,
        firstImageSrc
      });
    });

    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cartlist');

      cartItem.innerHTML = `
              <div class="cartimg">
                  <img src="${item.firstImageSrc}" alt="${item.productName}">
              </div>
              <div class="cartdetails">
                  <div class="cartname">${item.productName}</div>
                  <div class="item-description">
                      ${item.selectedColor ? `<p class="color">${item.selectedColor}</p>` : ''}
                      ${item.selectedSize ? `<p class="size">${item.selectedSize}</p>` : ''}
                      ${item.selectedType ? `<p class="type">${item.selectedType}</p>` : ''}
                      ${item.customNote ? `
                          <a href="#" class="show-note">Show Note</a>
                          <p class="note" style="display: none;">${item.customNote}</p>
                      ` : ''}
                  </div>
                  <div class="cartquantity">
                      <span class="minus">&lt;</span>
                      <span class="quantity">${item.quantity}</span>
                      <span class="plus">&gt;</span>
                  </div>
              </div>
              <div class="carttotal" data-unit-price="${item.unitPrice.toFixed(2)}">$${(item.unitPrice * item.quantity).toFixed(2)}</div>
              <div class="unit-price" style="display: none;">$${item.unitPrice.toFixed(2)}</div>
          `;

      const cartContainer = document.querySelector('#popout-cart .carttab');
      cartContainer.appendChild(cartItem);

      updateCart(cartItem);
    });

    updateSubtotal();
    updateCartCount();
  }

  loadCartFromLocalStorage();

  function clearCart() {
    document.querySelectorAll('.cartlist').forEach(item => item.remove());
    updateSubtotal();
    updateCartCount();
    localStorage.removeItem('cart');
  }

  const checkoutButton = document.querySelector('.checkout');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', clearCart);
  }
});









