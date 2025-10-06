// Lógica simple de autenticación usando localStorage

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simulamos guardar el usuario en localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                alert('Este correo ya está registrado.');
            } else {
                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                
                // Mostrar animación del tractor
                window.showTractorAnimation(
                    '¡Registro Exitoso!',
                    `Bienvenido ${username} a la familia EAMG`
                );
                
                // Redirigir después de la animación
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 4500);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // Simulamos una sesión guardando el usuario logueado
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                
                // Mostrar animación del tractor
                window.showTractorAnimation(
                    `¡Bienvenido, ${user.username}!`,
                    'Preparando tu experiencia agropecuaria...'
                );
                
                // Redirigir después de la animación
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 4500);
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        });
    }
});
