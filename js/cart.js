export const initCart = () => {
    if (!document.getElementById('cart-sidebar')) {
        const cartHTML = `
            <div id="cart-overlay" class="cart-overlay"></div>
            <aside id="cart-sidebar" class="cart-sidebar">
                <div class="cart-header">
                    <h2>Tu Carrito</h2>
                    <button id="close-cart" class="close-cart"><i class="fa fa-times"></i></button>
                </div>
                <div id="cart-items" class="cart-items">
                    <!-- Los items se renderizan aquí -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cart-total-price">S/ 0.00</span>
                    </div>
                    <button id="btn-checkout" class="btn-checkout">Proceder al pago</button>
                </div>
            </aside>
            
            <!-- Modal Simulación de Compra -->
            <div id="checkout-modal" class="checkout-modal">
                <div class="checkout-content">
                    <div id="checkout-loading" class="checkout-state">
                        <div class="spinner"></div>
                        <h3>Procesando pago...</h3>
                    </div>
                    <div id="checkout-success" class="checkout-state hidden">
                        <i class="fa fa-check-circle success-icon" style="color: #4CAF50; font-size: 3rem; margin-bottom: 15px;"></i>
                        <h3>¡Compra Exitosa!</h3>
                        <p>Gracias por confiar en ImportShop.</p>
                        <button id="btn-close-checkout" class="btn-filtrar mt-3">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartIcons = document.querySelectorAll('.cart-icon-container');
    const btnCheckout = document.getElementById('btn-checkout');
    
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutLoading = document.getElementById('checkout-loading');
    const checkoutSuccess = document.getElementById('checkout-success');
    const btnCloseCheckout = document.getElementById('btn-close-checkout');

    const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartCount = () => {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = totalItems;
        });
    };

    const renderCartItems = () => {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
            cartTotalPrice.textContent = 'S/ 0.00';
            btnCheckout.disabled = true;
            return;
        }

        btnCheckout.disabled = false;
        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.precio * item.cantidad;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img" onerror="this.src='imagenes/empresa/logo.png'">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="cart-item-price">S/ ${item.precio.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="btn-remove" data-id="${item.id}"><i class="fa fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalPrice.textContent = `S/ ${total.toFixed(2)}`;

        document.querySelectorAll('.btn-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                updateQuantity(parseInt(e.target.dataset.id), -1);
            });
        });

        document.querySelectorAll('.btn-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                updateQuantity(parseInt(e.target.dataset.id), 1);
            });
        });

        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnElement = e.target.closest('.btn-remove');
                removeFromCart(parseInt(btnElement.dataset.id));
            });
        });
    };

    const updateQuantity = (id, change) => {
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].cantidad += change;
            if (cart[itemIndex].cantidad <= 0) {
                cart.splice(itemIndex, 1);
            }
            saveCart(cart);
            updateCartCount();
            renderCartItems();
        }
    };

    const removeFromCart = (id) => {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        updateCartCount();
        renderCartItems();
    };

    const openCart = () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        renderCartItems();
    };

    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    };

    const simulatePurchase = () => {
        const cart = getCart();
        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        if(cart.length === 0) return;
        if(!usuarioActivo) {
            alert('Para continuar con la compra debes iniciar sesión o registrarte.');
            window.location.href = 'login.html';
            return;
        }
        
        closeCart();
        checkoutModal.classList.add('open');
        checkoutLoading.classList.remove('hidden');
        checkoutSuccess.classList.add('hidden');

        setTimeout(() => {
            checkoutLoading.classList.add('hidden');
            checkoutSuccess.classList.remove('hidden');
            
            saveCart([]);
            updateCartCount();
        }, 2000);
    };

    cartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    btnCheckout.addEventListener('click', simulatePurchase);
    btnCloseCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('open');
    });

    document.addEventListener('cartUpdated', () => {
        updateCartCount();
        if(cartSidebar.classList.contains('open')) {
            renderCartItems();
        }
    });

    document.addEventListener('openCart', () => {
        openCart();
    });

    updateCartCount();
};

export const addToCart = (producto, cantidad = 1) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === producto.id);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad += cantidad;
    } else {
        cart.push({ ...producto, cantidad });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.dispatchEvent(new Event('cartUpdated'));
    document.dispatchEvent(new Event('openCart'));
};
