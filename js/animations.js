// ===== PANTALLA DE CARGA PARA CONEXIONES LENTAS =====
(function() {
    const loadStartTime = Date.now();
    let loadingScreen = null;
    
    // Mostrar pantalla de carga si tarda más de 1 segundo
    const loadingTimeout = setTimeout(() => {
        loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-tractor">🚜</div>
                <div class="loading-text">Cargando EAMG...</div>
                <div class="loading-bar">
                    <div class="loading-bar-fill"></div>
                </div>
                <div class="loading-plants">🌿 🌾 🌱</div>
            </div>
        `;
        document.body.appendChild(loadingScreen);
    }, 1000);
    
    // Ocultar pantalla cuando termine de cargar
    window.addEventListener('load', () => {
        clearTimeout(loadingTimeout);
        
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }
    });
})();

// ===== FUNCIÓN PARA ANIMACIÓN DE TRACTOR =====
function showTractorAnimation(message = '¡Bienvenido!', subtitle = 'Cargando...') {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'tractor-animation-overlay';
    
    // Crear mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">🌾</div>
        <h2>${message}</h2>
        <p>${subtitle}</p>
    `;
    
    // Crear contenedor del tractor
    const tractorContainer = document.createElement('div');
    tractorContainer.className = 'tractor-container';
    
    // Crear tractor (emoji)
    const tractor = document.createElement('div');
    tractor.className = 'tractor';
    tractor.innerHTML = '🚜'; // Emoji de tractor
    
    // Crear nubes
    const cloud1 = document.createElement('div');
    cloud1.className = 'cloud cloud-1';
    const cloud2 = document.createElement('div');
    cloud2.className = 'cloud cloud-2';
    const cloud3 = document.createElement('div');
    cloud3.className = 'cloud cloud-3';
    
    // Ensamblar elementos
    tractorContainer.appendChild(tractor);
    overlay.appendChild(cloud1);
    overlay.appendChild(cloud2);
    overlay.appendChild(cloud3);
    overlay.appendChild(successMessage);
    overlay.appendChild(tractorContainer);
    
    // Añadir al body
    document.body.appendChild(overlay);
    
    // Eliminar después de 4.5 segundos
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s';
        setTimeout(() => overlay.remove(), 500);
    }, 4500);
}

// Hacer la función global para que pueda ser llamada desde otros scripts
window.showTractorAnimation = showTractorAnimation;

// ===== EFECTOS VISUALES =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. ANIMACIONES DE SCROLL REVEAL MEJORADAS
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const allSections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); // Efecto escalonado
            }
        });
    }, observerOptions);

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });

    fadeInSections.forEach(section => fadeObserver.observe(section));
    allSections.forEach(section => sectionObserver.observe(section));

    // 3. EFECTO DE PARALLAX SUAVE EN SCROLL
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card, .product-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.02 + (index % 3) * 0.01;
            const yPos = -(scrolled * speed);
            if (el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().top > -el.offsetHeight) {
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // 4. ANIMACIÓN DE ENTRADA DE TARJETAS DE PRODUCTO
    const productCards = document.querySelectorAll('.product-card, .card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInCard 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });

    // 5. EFECTO DE GLOW PULSANTE EN BOTONES CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    ctaButtons.forEach(btn => {
        setInterval(() => {
            btn.style.boxShadow = '0 8px 35px rgba(244, 163, 0, 0.7)';
            setTimeout(() => {
                btn.style.boxShadow = '0 6px 20px rgba(244, 163, 0, 0.4)';
            }, 500);
        }, 3000);
    });

    // 6. SMOOTH SCROLL MEJORADO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('✨ Efectos visuales mágicos activados!');
});
