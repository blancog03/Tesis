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

    // --- Cargar Productos Destacados ---
    const featuredContainer = document.getElementById('featured-products-container');
    if (featuredContainer && window.products) {
        const featuredProducts = window.products.slice(0, 4); // Tomar los primeros 4

        featuredProducts.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col';
            // Usamos la misma estructura de tarjeta que en products.js
            productCol.innerHTML = `
                <div class="card h-100 product-card">
                    <a href="product-detail.html?id=${product.id}" class="text-decoration-none text-dark d-block">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="fw-bold mt-auto">$${product.price.toFixed(2)} CUP</p>
                        </div>
                    </a>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100 add-to-cart-btn" data-product-id="${product.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;
            featuredContainer.appendChild(productCol);
        });

        // Delegación de eventos para los botones de añadir al carrito
        featuredContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.add-to-cart-btn');
            if (button) {
                const productId = parseInt(button.dataset.productId, 10);
                window.addToCart(productId);
            }
        });
    }

    // --- Validación del Formulario de Contacto ---
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.setAttribute('novalidate', ''); // Desactivar validación nativa del navegador

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = contactForm.querySelector('input[placeholder="Su Nombre"]');
            const emailInput = contactForm.querySelector('input[placeholder="Su Correo"]');
            const messageInput = contactForm.querySelector('textarea[placeholder="Su Mensaje"]');
            let isValid = true;

            // Función para validar email
            const validateEmail = (email) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };

            // Validar nombre
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }

            // Validar email
            if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Validar mensaje
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }

            if (isValid) {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                nameInput.classList.remove('is-valid');
                emailInput.classList.remove('is-valid');
                messageInput.classList.remove('is-valid');
            }
        });
    }
});
