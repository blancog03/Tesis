let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartDisplay = () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountBadge = document.getElementById('cartCount');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        cartTotalElement.textContent = total.toFixed(2);
    }

    if (cartCountBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCountBadge.textContent = totalItems;
            cartCountBadge.classList.remove('d-none');
        } else {
            cartCountBadge.classList.add('d-none');
        }
    }
};

window.addToCart = (productId) => {
    if (!window.products) {
        console.error('La lista de productos no está disponible.');
        return;
    }

    const productToAdd = window.products.find(p => p.id === productId);
    if (!productToAdd) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }

    saveCart();
    updateCartDisplay();
    
    const toastElement = document.getElementById('cartToast');
    if (toastElement) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cartModalElement = document.getElementById('cartModal');
    if (!cartModalElement) return;

    const cartModal = new bootstrap.Modal(cartModalElement);
    const openCartButton = document.getElementById('openCartBtn');
    const checkoutButton = document.getElementById('checkoutBtn');

    if (openCartButton) {
        openCartButton.addEventListener('click', () => {
            updateCartDisplay();
            cartModal.show();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('POR AHORA NO CONTAMOS CON EL PAGO EN LÍNEA. SUS PRODUCTOS HAN SIDO GUARDADOS POR UN PLAZO DE 24HRS PARA RECOGER SU PEDIDO Y CERRAR EL PAGO DE MANERA PRESENCIAL.');
                cart = []; // Limpia el carrito
                saveCart();
                updateCartDisplay();
                cartModal.hide();
            } else {
                alert('Tu carrito está vacío.');
            }
        });
    }

    updateCartDisplay();
});
