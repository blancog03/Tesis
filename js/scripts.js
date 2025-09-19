document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    if (productContainer) {
        displayProducts(products);
    }

    function displayProducts(productsToDisplay) {
        // Limpiar el contenedor por si acaso
        productContainer.innerHTML = '';

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="product-card-content">
                    <span class="product-category">${product.category}</span>
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)} CUP</p>
                    <button>Añadir al carrito</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }
});
