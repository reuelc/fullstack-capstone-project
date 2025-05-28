const handleLogin = async () => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        console.log("Login response:", response);
    } catch (error) {
        console.error('Login error:', error);
    }
};