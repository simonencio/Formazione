import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(() => {
        const stored = localStorage.getItem("themeMode");
        return stored || "system";
    });

    const getSystemPref = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const computeIsDark = (mode) => {
        if (mode === "dark") return true;
        if (mode === "light") return false;
        return getSystemPref(); // themeMode === 'system'
    };

    const [isDarkMode, setIsDarkMode] = useState(() => computeIsDark(themeMode));

    useEffect(() => {
        const updateTheme = () => {
            const isDark = computeIsDark(themeMode);
            document.documentElement.classList.toggle("dark", isDark);
            setIsDarkMode(isDark);
        };

        updateTheme(); // initial call
        localStorage.setItem("themeMode", themeMode);

        if (themeMode === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => updateTheme();
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        }
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
