import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../riutilizzabili/useThemeMode";
import ThemeModeDropdown from "./ThemeModeDropdown";
import ModaleRicerca from "./ModaleRicerca";
import Logo from "../riutilizzabili/Logo";

const Header = ({ setMenuOpen, contentTopRef }) => {
    const { themeMode, setThemeMode, isDarkMode } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownWrapperRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen(open => !open);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownWrapperRef.current && !dropdownWrapperRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logoSrc = isDarkMode ? "/kalimero_logo2.png" : "/kalimero_logo.png";

    const headerClasses = `sticky top-0 z-50 p-4 flex justify-between items-center shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`;

    const buttonClasses = `cursor-pointer text-[#c22e35] px-3 py-2 rounded transition-colors duration-300 ${isDarkMode ? " hover:bg-gray-700" : " hover:bg-gray-200"}`;

    return (
        <header className={headerClasses}>
            {/* Menu mobile (hamburger) */}
            <button
                id="icona-hamburger"
                className={`${buttonClasses} lg:hidden`}
                onClick={() => setMenuOpen(true)}
                aria-label="Apri Menu"
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Logo */}
            <div className="lg:justify-start">
                <Logo src={logoSrc} contentTopRef={contentTopRef} />
            </div>

            {/* Azioni: Tema + Ricerca */}
            <div className="flex items-center">
                {/* Pulsante tema con icona */}
                <div ref={dropdownWrapperRef} className="relative">
                    <button
                        onClick={toggleDropdown}
                        className={buttonClasses}
                        aria-label="Seleziona tema"
                    >
                        <FontAwesomeIcon icon={faCircleHalfStroke} size="lg" />
                    </button>
                    {dropdownOpen && (
                        <ThemeModeDropdown
                            selected={themeMode}
                            onChange={(value) => {
                                setThemeMode(value);
                                setDropdownOpen(false);
                            }}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </div>

                {/* Pulsante ricerca */}
                <button
                    className={buttonClasses}
                    aria-label="Cerca"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                </button>
            </div>

            {/* Modale ricerca */}
            <ModaleRicerca isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
};

export default Header;
