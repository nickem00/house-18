function parseJwt(token) {
    try {
      const base64 = token.split('.')[1];
      const json   = decodeURIComponent(
        atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

export function isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const payload = parseJwt(token);
    return payload?.isAdmin === true;
}