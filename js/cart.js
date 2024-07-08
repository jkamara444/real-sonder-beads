document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addcart');
    const subtotalElement = document.querySelector('.totalamt h4');
    const cartCountElement = document.querySelector('#order-icon span'); // Select the <span> element for cart count
    const popoutCart = document.querySelector('#popout-cart');
    const overlay = document.querySelector('#overlay');

    // Function to update cart count display and item total cost
    function updateCart(item) {
        const minusButton = item.querySelector('.minus');
        const plusButton = item.querySelector('.plus');
        const quantityElement = item.querySelector('.quantity');
        const cartTotalElement = item.querySelector('.carttotal');
        const unitPrice = parseFloat(cartTotalElement.getAttribute('data-unit-price'));

        minusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
                updateSubtotal();
                updateCartCount(); // Update cart count when quantity changes
                updateLocalStorage(); // Update local storage
            } else {
                item.remove();
                updateSubtotal();
                updateCartCount(); // Update cart count when item is removed
                updateLocalStorage(); // Update local storage
            }
        });

        plusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
            updateSubtotal();
            updateCartCount(); // Update cart count when quantity changes
            updateLocalStorage(); // Update local storage
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const parentItem = button.closest('.item-text-container');
            const productName = parentItem.querySelector('h2').innerText;
            const selectedColor = parentItem.querySelector('#color').value;
            const selectedSize = parentItem.querySelector('#size').value + ' in'; // Append 'in' for clarity
            const unitPrice = parseFloat(parentItem.querySelector('h4').innerText.replace('$', ''));

            // Create new cart item HTML structure
            const cartItem = document.createElement('div');
            cartItem.classList.add('cartlist');

            cartItem.innerHTML = `
                <div class="cartimg">
                    <!-- Replace with actual product image -->
                    <img src="../../../pics/bracelets/peachcrystalbracelet.jpg" alt="">
                </div>
                <div class="cartdetails">
                    <div class="cartname">${productName}</div>
                    <div class="item-description">
                        <p>${selectedColor}</p>
                        <p>${selectedSize}</p>
                    </div>
                    <div class="cartquantity">
                        <span class="minus">&lt;</span>
                        <span class="quantity">1</span>
                        <span class="plus">&gt;</span>
                    </div>
                </div>
                <div class="carttotal" data-unit-price="${unitPrice.toFixed(2)}">$${unitPrice.toFixed(2)}</div>
            `;

            // Append new cart item to cart section
            const cartContainer = document.querySelector('#popout-cart .carttab');
            cartContainer.appendChild(cartItem);

            // Initialize event listeners for quantity update
            updateCart(cartItem);
            updateSubtotal();
            updateCartCount(); // Update cart count after adding item
            updateLocalStorage(); // Update local storage

            // Show the cart and overlay
            popoutCart.classList.add('show');
            overlay.classList.add('show');
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
        // Serialize cart array and store in local storage
        const cartItems = [];
        document.querySelectorAll('.cartlist').forEach(cartItem => {
            const productName = cartItem.querySelector('.cartname').textContent;
            const selectedColor = cartItem.querySelector('.item-description p:first-child').textContent;
            const selectedSize = cartItem.querySelector('.item-description p:last-child').textContent;
            const unitPrice = parseFloat(cartItem.querySelector('.carttotal').getAttribute('data-unit-price'));
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent);

            cartItems.push({
                productName,
                selectedColor,
                selectedSize,
                unitPrice,
                quantity
            });
        });

        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Load cart items from local storage on page load
    function loadCartFromLocalStorage() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Add items to the cart based on local storage data
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cartlist');

            cartItem.innerHTML = `
                <div class="cartimg">
                    <!-- Replace with actual product image -->
                    <img src="../../../pics/bracelets/peachcrystalbracelet.jpg" alt="">
                </div>
                <div class="cartdetails">
                    <div class="cartname">${item.productName}</div>
                    <div class="item-description">
                        <p>${item.selectedColor}</p>
                        <p>${item.selectedSize}</p>
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

            // Initialize event listeners for quantity update
            updateCart(cartItem);
        });

        updateSubtotal(); // Update subtotal after loading cart items
        updateCartCount(); // Update cart count after loading cart items
    }

    loadCartFromLocalStorage(); // Load cart items from local storage on page load

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        // Clear local storage and remove all cart items
        localStorage.removeItem('cart');
        document.querySelectorAll('#popout-cart .cartlist').forEach(cartItem => {
            cartItem.remove();
        });

        // Update subtotal
        updateSubtotal();
        updateCartCount(); // Update cart count after checkout
    });
});
