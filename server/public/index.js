document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    orderIcon: document.getElementById('order-icon'),
    popoutCart: document.getElementById('popout-cart'),
    closeCartButton: document.getElementById('close-cart'),
    addToCartButtons: document.querySelectorAll('.addcart'),
    menuIcon: document.getElementById('menu-icon'),
    popoutMenu: document.getElementById('popout-menu'),
    closeMenuIcon: document.getElementById('close-menu'),
    overlay: document.getElementById('overlay')
  };

  const togglePopup = (popup) => {
    console.log('Toggling popup:', popin);
    popin.classList.toggle('show');
    elements.overlay.classList.toggle('show');
  };

  if (elements.orderIcon) {
    console.log('Order icon found.');
    elements.orderIcon.addEventListener('click', () => {
      console.log('Order icon clicked.');
      togglePopup(elements.popoutCart);
    });
  } else {
    console.error('Order icon not found.');
  }

  if (elements.closeCartButton) {
    console.log('Close cart button found.');
    elements.closeCartButton.addEventListener('click', () => {
      console.log('Close cart button clicked.');
      elements.popoutCart.classList.remove('show');
      elements.overlay.classList.remove('show');
    });
  } else {
    console.error('Close cart button not found.');
  }

  if (elements.menuIcon) {
    console.log('Menu icon found.');
    elements.menuIcon.addEventListener('click', () => {
      console.log('Menu icon clicked.');
      togglePopup(elements.popoutMenu);
    });
  } else {
    console.error('Menu icon not found.');
  }

  if (elements.closeMenuIcon) {
    console.log('Close menu icon found.');
    elements.closeMenuIcon.addEventListener('click', () => {
      console.log('Close menu icon clicked.');
      elements.popoutMenu.classList.remove('show');
      elements.overlay.classList.remove('show');
    });
  } else {
    console.error('Close menu icon not found.');
  }

  if (elements.overlay) {
    console.log('Overlay found.');
    elements.overlay.addEventListener('click', () => {
      console.log('Overlay clicked.');
      elements.popoutMenu.classList.remove('show');
      elements.popoutCart.classList.remove('show');
      elements.overlay.classList.remove('show');
    });
  } else {
    console.error('Overlay not found.');
  }

  if (elements.addToCartButtons.length > 0) {
    console.log('Add to cart buttons found.');
    elements.addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log('Add to cart button clicked.');
        elements.popoutCart.classList.add('show');
        elements.overlay.classList.add('show');
      });
    });
  } else {
    console.error('Add to cart buttons not found.');
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

  if (filterButton) {
    console.log('Filter button found:', filterButton);
    filterButton.addEventListener("change", () => filterItems(filterButton.value));
  } else {
    console.error('Filter button not found.');
  }

  if (sortButton) {
    console.log('Sort button found:', sortButton);
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
  } else {
    console.error('Sort button not found.');
  }

  function filterItems(category) {
    items.forEach(item => {
      const itemCategory = item.getAttribute("data-category");
      item.style.display = (category === "all" || category === itemCategory) ? "block" : "none";
    });
  }
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


// popup
document.addEventListener('DOMContentLoaded', () => {

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

});
