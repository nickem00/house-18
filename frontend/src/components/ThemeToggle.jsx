import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/LightModeButton.css';

// ThemeToggle component to switch between light and dark mode
// This component uses local storage to persist the theme between page reloads.
export default function ThemeToggle() {
    // State to manage light mode
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem("theme") === "light";
    });

    // Effect to apply the theme based on the state
    // and save the preference in local storage
    useEffect(() => {
        document.body.classList.toggle("light-mode", isLightMode);
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    }, [isLightMode]);

    // The acutal button component for the switch
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