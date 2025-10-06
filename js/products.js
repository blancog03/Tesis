document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    if (!productContainer || !window.products) return;

    const renderProducts = (productsToRender) => {
        productContainer.innerHTML = '';
        if (productsToRender.length === 0) {
            productContainer.innerHTML = '<div class="col-12"><p class="text-center">No se encontraron productos que coincidan con su búsqueda.</p></div>';
            return;
        }
        productsToRender.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col';
            productCol.innerHTML = `
                <div class="card h-100 product-card">
                    <a href="product-detail.html?id=${product.id}" class="text-decoration-none text-dark d-block">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <p class="fw-bold">$${product.price.toFixed(2)} CUP</p>
                        </div>
                    </a>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100 add-to-cart-btn" data-product-id="${product.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCol);
        });
    };

    const populateCategories = () => {
        const categories = [...new Set(window.products.map(p => p.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    };

    const filterAndRender = () => {
        let filtered = [...window.products];
        const category = categoryFilter.value;
        const search = searchInput.value.toLowerCase();

        // Filtrar por categoría
        if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        // Filtrar por texto de búsqueda
        if (search) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(search) || 
                p.description.toLowerCase().includes(search)
            );
        }
        renderProducts(filtered);
    };

    // Delegación de eventos para los botones "Añadir al carrito"
    productContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.add-to-cart-btn');
        if (button) {
            const productId = parseInt(button.dataset.productId, 10);
            window.addToCart(productId);
        }
    });

    if (categoryFilter) categoryFilter.addEventListener('change', filterAndRender);
    if (searchInput) searchInput.addEventListener('input', filterAndRender);

    // Carga inicial
    populateCategories();
    renderProducts(window.products);
});
