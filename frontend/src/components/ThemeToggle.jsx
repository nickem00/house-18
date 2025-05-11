import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/LightModeButton.css';

export default function ThemeToggle() {
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem("theme") === "light";
    });

    useEffect(() => {
        document.body.classList.toggle("light-mode", isLightMode);
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

    return (
        <button className="light-mode-button" onClick={() => setIsLightMode(prev => !prev)}>
            {isLightMode ? (
                <FontAwesomeIcon 
                icon="moon" 
                alt="Dark mode icon" 
                />
            ) : (
                <FontAwesomeIcon icon="sun" alt="Light mode icon" />
            )}
        </button>
    )
}