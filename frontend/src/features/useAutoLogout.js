import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function useAutoLogout() {
  const navigate = useNavigate();
  const logoutTimerRef = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("loggedIn", "false");
    navigate("/login-register");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Rensa eventuell gammal timer
    clearTimeout(logoutTimerRef.current);

    const { exp } = jwtDecode(token);
    const msLeft = exp * 1000 - Date.now();
    if (msLeft <= 0) {
      // Token redan för gammal
      return logout();
    }

    // Sätt timer för automatisk logout
    logoutTimerRef.current = window.setTimeout(logout, msLeft);

    // Rensa timer om komponenten avmonteras
    return () => clearTimeout(logoutTimerRef.current);
  }, [navigate]);
}
