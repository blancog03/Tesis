document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');

    if (!productDetailContainer || !window.products) {
        console.error('Elementos necesarios no encontrados.');
        if (productDetailContainer) productDetailContainer.innerHTML = '<p class="text-center text-danger">Error al cargar el producto.</p>';
        return;
    }

    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'), 10);
    };

    const productId = getProductIdFromUrl();
    const product = window.products.find(p => p.id === productId);

    if (product) {
        document.title = `${product.name} - EAMG`; // Actualizar el título de la página
        productDetailContainer.innerHTML = `
            <div class="col-md-6">
                <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h2>${product.name}</h2>
                <p class="lead text-muted">Categoría: ${product.category}</p>
                <p>${product.description}</p>
                <h3 class="my-3">$${product.price.toFixed(2)} CUP</h3>
                <div class="d-grid gap-2">
                    <button id="detail-add-to-cart" class="btn btn-primary btn-lg" type="button">Añadir al carrito</button>
                </div>
            </div>
        `;

        const addToCartButton = document.getElementById('detail-add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                window.addToCart(product.id);
            });
        }

    } else {
        productDetailContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>Producto no encontrado</h3>
                <p>El producto que buscas no existe o ha sido eliminado.</p>
                <a href="products.html" class="btn btn-primary">Volver al catálogo</a>
            </div>
        `;
    }
});
