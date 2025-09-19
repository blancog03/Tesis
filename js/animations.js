document.addEventListener('DOMContentLoaded', () => {
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    if (!sectionsToAnimate.length) return;

    const observerOptions = {
        root: null, // usa el viewport
        rootMargin: '0px',
        threshold: 0.1 // se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // deja de observar una vez que la animación se ha disparado
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});
