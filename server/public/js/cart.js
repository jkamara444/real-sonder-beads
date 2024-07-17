document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addcart');
    const subtotalElement = document.querySelector('.totalamt h4');
    const cartCountElement = document.querySelector('#order-icon span');
    const popoutCart = document.querySelector('#popout-cart');
    const overlay = document.querySelector('#overlay');

    // Function to update cart count display and item total cost
    function updateCart(item) {
        const minusButton = item.querySelector('.minus');
        const plusButton = item.querySelector('.plus');
        const quantityElement = item.querySelector('.quantity');
        const cartTotalElement = item.querySelector('.carttotal');
        const unitPrice = parseFloat(cartTotalElement.getAttribute('data-unit-price'));

        function updateQuantity(change) {
            let quantity = parseInt(quantityElement.textContent) + change;
            quantity = Math.max(1, quantity); // Ensure quantity doesn't go below 1
            quantityElement.textContent = quantity;
            cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
            updateSubtotal();
            updateCartCount();
            updateLocalStorage();
        }

        minusButton.addEventListener('click', () => updateQuantity(-1));
        plusButton.addEventListener('click', () => updateQuantity(1));

        // Toggle note display
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

    // Function to add item to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentItem = button.closest('.item-text-container');
            const productName = parentItem.querySelector('h2').innerText;
            const selectedColor = parentItem.querySelector('#color')?.value || 'N/A';
            const selectedSize = parentItem.querySelector('#size')?.value + ' in' || 'N/A';
            const selectedType = parentItem.querySelector('#type')?.value || 'N/A';
            const customNote = parentItem.querySelector('#note')?.value || 'N/A';
            const unitPrice = parseFloat(parentItem.querySelector('h4').innerText.replace('$', ''));
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

    // Function to update subtotal display
    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.carttotal').forEach(cartTotalElement => {
            subtotal += parseFloat(cartTotalElement.textContent.replace('$', ''));
        });
        subtotalElement.textContent = `$${subtotal.toFixed(2)} USD`;
    }

    // Function to update cart count display
    function updateCartCount() {
        let totalItems = 0;
        document.querySelectorAll('.cartlist').forEach(cartItem => {
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
            totalItems += quantity;
        });
        cartCountElement.textContent = totalItems;
    }

    // Function to update local storage with current cart items
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

    // Function to load cart items from local storage on page load
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
            `;

            const cartContainer = document.querySelector('#popout-cart .carttab');
            cartContainer.appendChild(cartItem);

            updateCart(cartItem);
        });

        updateSubtotal();
        updateCartCount();
    }

    // Load cart items from local storage when the page loads
    loadCartFromLocalStorage();

    // Function to clear cart items and update display
    function clearCart() {
        document.querySelectorAll('.cartlist').forEach(item => item.remove());
        updateSubtotal();
        updateCartCount();
        localStorage.removeItem('cart'); // Clear local storage
    }

    // Add event listener for checkout button to clear cart
    const checkoutButton = document.querySelector('.checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', clearCart);
    }
});
