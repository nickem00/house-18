export function logout(navigate) {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Navigate to the login page
    if (navigate) {
        navigate('/Login-Register');
    }
    
    return true;
}
