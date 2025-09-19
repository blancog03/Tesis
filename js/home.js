document.addEventListener('DOMContentLoaded', () => {
    const categoryContainer = document.getElementById('category-container');

    // Obtener categorías únicas de los datos
    const categories = [...new Set(products.map(product => product.category))];

    if (categoryContainer) {
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'col-md-4 mb-4';

            // Descripción simple para cada categoría (se puede mejorar)
            let description = 'Productos de alta calidad.';
            let image = 'media/img/hero2.jpg'; // Imagen por defecto
            if (category === 'Agrícola') { description = 'Frutas, verduras y granos frescos del campo.'; image = 'media/img/tomates.webp'; }
            if (category === 'Pecuario') { description = 'Carnes y productos lácteos de nuestra ganadería.'; image = 'media/img/leche.jpg'; }
            if (category === 'Procesado') { description = 'Productos elaborados artesanalmente.'; image = 'media/img/queso.jpg'; }
            if (category === 'Pesca') { description = 'La mejor selección de productos del mar.'; image = 'media/img/pescado.jpg'; }

            categoryCard.innerHTML = `
                <div class="card h-100 text-center">
                    <img src="${image}" class="card-img-top" alt="${category}" style="height: 180px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${category}</h5>
                        <p class="card-text">${description}</p>
                        <a href="products.html?category=${category}" class="btn btn-primary">Ver Productos</a>
                    </div>
                </div>
            `;
            categoryContainer.appendChild(categoryCard);
        });
    }
});
