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

    // Per tooltip logo
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showLogoTooltip, setShowLogoTooltip] = useState(false);

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

    // Funzione per controllare se siamo sopra md
    const isAboveMd = () => window.innerWidth >= 768;

    // Gestione tooltip logo
    const handleLogoMouseEnter = () => {
        if (isAboveMd()) setShowLogoTooltip(true);
    };
    const handleLogoMouseLeave = () => {
        setShowLogoTooltip(false);
    };

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const onResize = () => {
            if (!isAboveMd()) {
                setShowLogoTooltip(false);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const headerClasses = `sticky top-0 z-50 p-4 flex justify-between items-center shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`;

    const buttonClasses = `cursor-pointer text-[#c22e35] px-3 py-2 rounded transition-colors duration-300`;

    return (
        <header className={headerClasses} onMouseMove={handleMouseMove}>
            {/* Menu mobile (hamburger) */}
            <span
                id="icona-hamburger"
                onClick={() => setMenuOpen(true)}
                className={`${buttonClasses} lg:hidden cursor-pointer`}
                role="button"
                tabIndex={0}
                aria-label="Apri Menu"
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </span>

            {/* Logo con tooltip */}
            <div className="lg:justify-start">
                <a
                    href="https://www.kalimero.it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleLogoMouseEnter}
                    onMouseLeave={handleLogoMouseLeave}
                >
                    <Logo src={logoSrc} contentTopRef={contentTopRef} />
                </a>
            </div>

            {/* Azioni: Tema + Ricerca */}
            <div className="flex items-center">
                {/* Pulsante tema con icona */}
                <div ref={dropdownWrapperRef} className="relative">
                    <span
                        onClick={toggleDropdown}
                        className={`${buttonClasses} cursor-pointer`}
                        role="button"
                        tabIndex={0}
                        aria-label="Seleziona tema"
                    >
                        <FontAwesomeIcon
                            icon={faCircleHalfStroke}
                            size="lg"
                            className="transition-transform duration-300 ease-in-out hover:scale-160 hover:shadow-xl"
                        />
                    </span>

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

                {/* Pulsante ricerca come icona interattiva */}
                <span
                    onClick={() => setIsModalOpen(true)}
                    className={`${buttonClasses} cursor-pointer`}
                    role="button"
                    tabIndex={0}
                    aria-label="Cerca"
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        className="transition-transform duration-300 ease-in-out hover:scale-150 hover:shadow-xl"
                    />
                </span>
            </div>

            {/* Modale ricerca */}
            <ModaleRicerca isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Tooltip logo */}
            {showLogoTooltip && (
                <div
                    className="fixed z-50 px-3 py-1 text-sm bg-black text-white rounded pointer-events-none"
                    style={{
                        top: mousePos.y + 20,
                        left: mousePos.x + 20,
                    }}
                >
                    Home
                </div>
            )}
        </header>
    );
};

export default Header;
