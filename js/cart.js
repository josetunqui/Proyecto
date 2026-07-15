
const CUPONES = {
    'BIENVENIDO1': 0.01,
    'PERU': 0.05,
    'DESCUENTOM': 0.02,
    'DCST10': 0.10,
};

let couponDiscount = 0;       // Almacena el porcentaje del cupón activo (ej: 0.05)
let appliedCouponName = '';   // Almacena el nombre del cupón activo (ej: 'PERU')

export const initCart = () => {
    if (!document.getElementById('cart-sidebar')) {
        const cartHTML = `
            <div id="cart-overlay" class="cart-overlay"></div>
            <aside id="cart-sidebar" class="cart-sidebar" style="display: flex; flex-direction: column; height: 100vh;">
                <div class="cart-header">
                    <h2>Tu Carrito</h2>
                    <button id="close-cart" class="close-cart"><i class="fa fa-times"></i></button>
                </div>
                
                <div id="cart-items" class="cart-items" style="flex-grow: 1; overflow-y: auto;">
                    </div>

                <div class="cart-discounts" style="padding: 15px; border-top: 1px solid #ccc; background: #f9f9f9;">
                    <div class="mb-2">
                        <label style="font-size: 0.9em; font-weight: bold;">Descuento General:</label>
                        <select id="discount-select" style="width: 100%; padding: 5px; margin-top: 5px;">
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="15">15%</option>
                        </select>
                    </div>
                    <div class="mb-2" style="margin-top: 10px;">
                        <label style="font-size: 0.9em; font-weight: bold;">Cupón Promocional:</label>
                        <div style="display: flex; gap: 5px; margin-top: 5px;">
                            <input type="text" id="promo-input" placeholder="INGRESE CUPÓN" style="flex-grow: 1; padding: 5px; text-transform: uppercase;">
                            <button id="btn-apply-promo" style="padding: 5px 10px; cursor: pointer; background: #333; color: white; border: none;">Aplicar</button>
                        </div>
                        <small style="color: #666; display: block; margin-top: 5px;">Ejemplos: DCST10, PERU, BIENVENIDO1</small>
                        <small id="promo-msg" style="color: green; display: none; font-weight: bold; margin-top: 5px;"></small>
                    </div>
                </div>

                <div class="cart-footer" style="padding: 15px; border-top: 1px solid #eee;">
                    <div style="font-size: 0.9em; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Subtotal:</span> <span id="cart-subtotal">S/ 0.00</span>
                        </div>
                        <div id="row-discount-select" style="display: none; justify-content: space-between; color: #d9534f;">
                            <span>Desc. Select:</span> <span id="val-discount-select">- S/ 0.00</span>
                        </div>
                        <div id="row-discount-promo" style="display: none; justify-content: space-between; color: #5cb85c;">
                            <span id="lbl-discount-promo">Cupón:</span> <span id="val-discount-promo">- S/ 0.00</span>
                        </div>
                        <div id="row-discount-auto" style="display: none; justify-content: space-between; color: #0275d8; font-weight: bold;">
                            <span>Desc. > S/ 1000 (2%):</span> <span id="val-discount-auto">- S/ 0.00</span>
                        </div>
                    </div>

                    <div class="cart-total" style="font-size: 1.2em; border-top: 2px solid #333; padding-top: 10px; display: flex; justify-content: space-between; font-weight: bold;">
                        <span>Total a Pagar:</span>
                        <span id="cart-total-price">S/ 0.00</span>
                    </div>
                    <button id="btn-checkout" class="btn-checkout" style="width: 100%; margin-top: 15px; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; font-size: 1.1em;">Proceder al pago</button>
                </div>
            </aside>
            
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
    const btnCheckout = document.getElementById('btn-checkout');

    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const discountSelect = document.getElementById('discount-select');
    const promoInput = document.getElementById('promo-input');
    const btnApplyPromo = document.getElementById('btn-apply-promo');
    const promoMsg = document.getElementById('promo-msg');

    const rowDiscountSelect = document.getElementById('row-discount-select');
    const valDiscountSelect = document.getElementById('val-discount-select');
    const rowDiscountPromo = document.getElementById('row-discount-promo');
    const lblDiscountPromo = document.getElementById('lbl-discount-promo');
    const valDiscountPromo = document.getElementById('val-discount-promo');
    const rowDiscountAuto = document.getElementById('row-discount-auto');
    const valDiscountAuto = document.getElementById('val-discount-auto');

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

    const calculateTotals = () => {
        const cart = getCart();
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.precio * item.cantidad;
        });

        cartSubtotal.textContent = `S/ ${subtotal.toFixed(2)}`;

        if (subtotal === 0) {
            cartTotalPrice.textContent = 'S/ 0.00';
            btnCheckout.disabled = true;
            hideAllDiscounts();
            return;
        }

        btnCheckout.disabled = false;
        let totalFinal = subtotal;

        // 1. Descuento Select (0, 5, 10, 15)
        const selectValue = parseFloat(discountSelect.value) || 0;
        if (selectValue > 0) {
            const selectDiscountAmount = totalFinal * (selectValue / 100);
            totalFinal -= selectDiscountAmount;
            rowDiscountSelect.style.display = 'flex';
            valDiscountSelect.textContent = `- S/ ${selectDiscountAmount.toFixed(2)} (${selectValue}%)`;
        } else {
            rowDiscountSelect.style.display = 'none';
        }

        // 2. Descuento Cupón Dinámico (Configurado en el objeto CUPONES arriba)
        if (couponDiscount > 0) {
            const promoAmount = totalFinal * couponDiscount;
            totalFinal -= promoAmount;
            rowDiscountPromo.style.display = 'flex';
            lblDiscountPromo.textContent = `Cupón ${appliedCouponName} (${couponDiscount * 100}%):`;
            valDiscountPromo.textContent = `- S/ ${promoAmount.toFixed(2)}`;
        } else {
            rowDiscountPromo.style.display = 'none';
        }

        // 3. Descuento Automático > 1000 Soles (2%)
        if (totalFinal > 1000) {
            const autoAmount = totalFinal * 0.02; // 2% de descuento automático
            totalFinal -= autoAmount;
            rowDiscountAuto.style.display = 'flex';
            valDiscountAuto.textContent = `- S/ ${autoAmount.toFixed(2)}`;
        } else {
            rowDiscountAuto.style.display = 'none';
        }

        cartTotalPrice.textContent = `S/ ${Math.max(0, totalFinal).toFixed(2)}`;
    };

    const hideAllDiscounts = () => {
        rowDiscountSelect.style.display = 'none';
        rowDiscountPromo.style.display = 'none';
        rowDiscountAuto.style.display = 'none';
    };

    const renderCartItems = () => {
        const cart = getCart();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart" style="text-align: center; padding: 20px;">Tu carrito está vacío.</p>';
            calculateTotals();
            return;
        }

        cart.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.cssText = 'display: flex; gap: 10px; padding: 10px; border-bottom: 1px solid #eee; align-items: center;';
            cartItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img" style="width: 60px; height: 60px; object-fit: cover;" onerror="this.src='imagenes/empresa/logo.png'">
                <div class="cart-item-info" style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1em;">${item.nombre}</h4>
                    <p class="cart-item-price" style="margin: 5px 0; font-weight: bold; color: #28a745;">S/ ${item.precio.toFixed(2)}</p>
                    <div class="cart-item-controls" style="display: flex; gap: 10px; align-items: center;">
                        <button class="btn-qty btn-minus" data-id="${item.id}" style="width: 25px;">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-qty btn-plus" data-id="${item.id}" style="width: 25px;">+</button>
                    </div>
                </div>
                <button class="btn-remove" data-id="${item.id}" style="background: transparent; border: none; color: red; cursor: pointer; font-size: 1.2em;">
                    <i class="fa fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        calculateTotals();

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

    const resetDiscounts = () => {
        couponDiscount = 0;
        appliedCouponName = '';
        promoInput.value = '';
        promoInput.disabled = false;
        btnApplyPromo.disabled = false;
        promoMsg.style.display = 'none';
        discountSelect.value = "0";
    };

    const simulatePurchase = () => {
        const cart = getCart();
        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

        if (cart.length === 0) return;

        // 1. Validar que el usuario haya iniciado sesión
        if (!usuarioActivo) {
            alert('Para continuar con la compra debes iniciar sesión o registrarte.');
            window.location.href = 'login.html';
            return;
        }

        // 2. Validar que el usuario NO sea administrador
        // Nota: Asegúrate de que la propiedad se llame 'rol' o ajústala según tu objeto de usuario (ej: usuarioActivo.tipo, usuarioActivo.role)
        if (usuarioActivo.rol === 'admin' || usuarioActivo.rol === 'administrador') {
            alert('Las cuentas de administrador no están habilitadas para realizar compras. Por favor, ingresa con una cuenta de cliente.');
            return;
        }

        // 3. Proceder con la simulación de compra si pasó las validaciones
        closeCart();
        checkoutModal.classList.add('open');
        checkoutLoading.classList.remove('hidden');
        checkoutSuccess.classList.add('hidden');

        setTimeout(() => {
            checkoutLoading.classList.add('hidden');
            checkoutSuccess.classList.remove('hidden');

            saveCart([]);
            resetDiscounts();
            updateCartCount();
        }, 2000);
    };

    discountSelect.addEventListener('change', () => {
        calculateTotals();
    });

    // 3. EVENTO DE CUPONES DINÁMICOS
    btnApplyPromo.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();

        // Verifica si el código escrito existe en nuestro objeto CUPONES
        if (CUPONES[code] !== undefined) {
            couponDiscount = CUPONES[code];
            appliedCouponName = code;

            promoMsg.style.display = 'block';
            promoMsg.textContent = `¡Cupón ${code} aplicado (${couponDiscount * 100}%)!`;
            promoInput.disabled = true;
            btnApplyPromo.disabled = true;
            calculateTotals();
        } else {
            alert('Código promocional inválido.');
        }
    });

    document.querySelectorAll('.cart-icon-container').forEach(icon => {
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
        if (cartSidebar.classList.contains('open')) {
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

};