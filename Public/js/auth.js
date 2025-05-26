document.addEventListener('DOMContentLoaded', () => {
// Signup Form Handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
// Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const password = document.getElementById('password').value.trim();
            
// Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            let isValid = true;
            
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Invalid email format';
                isValid = false;
            }
            
            if (!contact) {
                document.getElementById('contactError').textContent = 'Contact number is required';
                isValid = false;
            }
            
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            } else if (!/^\d{6,}$/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must be numeric and at least 6 digits';
                isValid = false;
            }
            
            if (!isValid) return;
            
// Show loading
            const loading = document.getElementById('loading');
            const message = document.getElementById('message');
            loading.style.display = 'block';
            message.textContent = '';
            message.className = 'message';
            
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        contact_number: contact,
                        password
                    }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    message.textContent = 'Registration successful! Redirecting to login...';
                    message.className = 'message success';
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                } else {
                    message.textContent = data.error || 'Registration failed';
                    message.className = 'message error';
                }
            } catch (error) {
                message.textContent = 'Network error. Please try again.';
                message.className = 'message error';
            } finally {
                loading.style.display = 'none';
            }
        });
    }
    
// Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
// Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            let isValid = true;
            
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            }
            
            if (!password) {
                document.getElementById('passwordError').textContent = 'Password is required';
                isValid = false;
            }
            
            if (!isValid) return;
            
// Show loading
            const loading = document.getElementById('loading');
            const message = document.getElementById('message');
            loading.style.display = 'block';
            message.textContent = '';
            message.className = 'message';
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
 // Save token to localStorage
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userName', data.user.name);
                    
 // Redirect to home
                    window.location.href = '/home';
                } else {
                    message.textContent = data.error || 'Login failed';
                    message.className = 'message error';
                }
            } catch (error) {
                message.textContent = 'Network error. Please try again.';
                message.className = 'message error';
            } finally {
                loading.style.display = 'none';
            }
        });
    }
});

