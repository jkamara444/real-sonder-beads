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

  const togglePopin = (popin) => {
    console.log('Toggling popup:', popin);
    popin.classList.toggle('show');
    elements.overlay.classList.toggle('show');
  };

  if (elements.orderIcon && elements.popoutCart && elements.closeCartButton && elements.menuIcon && elements.popoutMenu && elements.closeMenuIcon && elements.overlay) {
    elements.orderIcon.addEventListener('click', () => {
      togglePopin(elements.popoutCart);
    });

    elements.closeCartButton.addEventListener('click', () => {
      elements.popoutCart.classList.remove('show');
      elements.overlay.classList.remove('show');
    });

    elements.menuIcon.addEventListener('click', () => {
      togglePopin(elements.popoutMenu);
    });

    elements.closeMenuIcon.addEventListener('click', () => {
      elements.popoutMenu.classList.remove('show');
      elements.overlay.classList.remove('show');
    });

    elements.overlay.addEventListener('click', () => {
      elements.popoutMenu.classList.remove('show');
      elements.popoutCart.classList.remove('show');
      elements.overlay.classList.remove('show');
    });

    elements.addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        elements.popoutCart.classList.add('show');
        elements.overlay.classList.add('show');
      });
    });
  } else {
    console.error('One or more elements not found.');
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

  if (typeSelect && priceElement) {
    typeSelect.addEventListener('change', (event) => {
      const selectedOption = event.target.selectedOptions[0];
      const unitPrice = parseFloat(selectedOption.getAttribute('data-price'));
      priceElement.textContent = `$${unitPrice.toFixed(2)}`;
    });
  } else {
    console.error('Type select or price element not found.');
  }
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

  window.onload = function () {
    if (!sessionStorage.getItem('popupShown')) {
      setTimeout(showPopup, 4000);
    }
  }

  const closeButton = document.getElementById('close-button');
  if (closeButton) {
    closeButton.addEventListener('click', closePopup);
  } else {
    console.error('Element with id "close-button" not found.');
  }

});