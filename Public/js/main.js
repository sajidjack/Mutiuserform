document.addEventListener('DOMContentLoaded', () => {
// Check authentication
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    
    if (!token) {
        window.location.href = '/login';
        return;
    }
    
// Set user greeting
    if (userName) {
        document.getElementById('userGreeting').textContent = `Welcome, ${userName}`;
    }
    
// Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');
            window.location.href = '/login';
        });
    }
    
// Verify token on page load
    verifyToken();
    
    async function verifyToken() {
        try {
            const response = await fetch('/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Invalid token');
            }
        } catch (error) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');
            window.location.href = '/login';
        }
    }
});

