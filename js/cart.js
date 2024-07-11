document.addEventListener('DOMContentLoaded', function () {
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
        const unitPrice = parseFloat(cartTotalElement.getAttribute('data-unit-price'));

        minusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
                updateSubtotal();
                updateCartCount();
                updateLocalStorage();
            } else {
                item.remove();
                updateSubtotal();
                updateCartCount();
                updateLocalStorage();
            }
        });

        plusButton.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
            updateSubtotal();
            updateCartCount();
            updateLocalStorage();
        });

        const showNoteButton = item.querySelector('.show-note');
        const noteElement = item.querySelector('.note');

        if (showNoteButton && noteElement) {
            showNoteButton.addEventListener('click', () => {
                const isNoteVisible = noteElement.style.display === 'block';
                noteElement.style.display = isNoteVisible ? 'none' : 'block';
                showNoteButton.textContent = isNoteVisible ? 'Show Note' : 'Hide Note';
            });

            noteElement.style.display = 'none';
            showNoteButton.textContent = 'Show Note';
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const parentItem = button.closest('.item-text-container');
            const productName = parentItem.querySelector('h2').innerText;
            const selectedColor = parentItem.querySelector('#color') ? parentItem.querySelector('#color').value : 'N/A';
            const selectedSize = parentItem.querySelector('#size') ? parentItem.querySelector('#size').value + ' in' : 'N/A';
            const selectedType = parentItem.querySelector('#type') ? parentItem.querySelector('#type').value : 'N/A';
            const customNote = parentItem.querySelector('#note') ? parentItem.querySelector('#note').value : 'N/A';
            const unitPrice = parseFloat(parentItem.querySelector('h4').innerText.replace('$', ''));

            const cartItem = document.createElement('div');
            cartItem.classList.add('cartlist');

            cartItem.innerHTML = `
                <div class="cartimg">
                    <img src="../../../pics/bracelets/peachcrystalbracelet.jpg" alt="">
                </div>
                <div class="cartdetails">
                    <div class="cartname">${productName}</div>
                    <div class="item-description">
                        ${selectedColor !== 'N/A' ? `<p class="color">${selectedColor}</p>` : ''}
                        ${selectedSize !== 'N/A' ? `<p class="size">${selectedSize}</p>` : ''}
                        ${selectedType !== 'N/A' ? `<p class="type">Type: ${selectedType}</p>` : ''}
                        ${customNote !== 'N/A' ? `<p class="show-note">Show Note</p><p class="note">${customNote}</p>` : ''}
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
            const selectedColor = cartItem.querySelector('.item-description p.color') ? cartItem.querySelector('.item-description p.color').textContent : '';
            const selectedSize = cartItem.querySelector('.item-description p.size') ? cartItem.querySelector('.item-description p.size').textContent : '';
            const selectedType = cartItem.querySelector('.item-description p.type') ? cartItem.querySelector('.item-description p.type').textContent : '';
            const customNote = cartItem.querySelector('.item-description p.note') ? cartItem.querySelector('.item-description p.note').textContent : '';
            const unitPrice = parseFloat(cartItem.querySelector('.carttotal').getAttribute('data-unit-price'));
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent);

            cartItems.push({
                productName,
                selectedColor,
                selectedSize,
                selectedType,
                customNote,
                unitPrice,
                quantity
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
                    <img src="../../../pics/bracelets/peachcrystalbracelet.jpg" alt="">
                </div>
                <div class="cartdetails">
                    <div class="cartname">${item.productName}</div>
                    <div class="item-description">
                        ${item.selectedColor ? `<p class="color">${item.selectedColor}</p>` : ''}
                        ${item.selectedSize ? `<p class="size">${item.selectedSize}</p>` : ''}
                        ${item.selectedType ? `<p class="type">${item.selectedType}</p>` : ''}
                        ${item.customNote ? `<p class="show-note">Show Note</p><p class="note">${item.customNote}</p>` : ''}
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

    loadCartFromLocalStorage();

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        document.querySelectorAll('#popout-cart .cartlist').forEach(cartItem => {
            cartItem.remove();
        });

        updateSubtotal();
        updateCartCount();
    });
});
