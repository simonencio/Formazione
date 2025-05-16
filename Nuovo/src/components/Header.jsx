import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import ModaleRicerca from "./ModaleRicerca";
import Logo from "../riutilizzabili/Logo";

const Header = ({ setMenuOpen, contentTopRef }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener("change", handleChange);
        return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }, []);

    const logoSrc = isDarkMode ? "/kalimero_logo2.png" : "/kalimero_logo.png";

    return (
        <header className="header-container shadow-lg sticky top-0 z-50">
            <div className="header-inner flex justify-between items-center p-4">
                <button
                    id="icona-hamburger"
                    className="px-4 cursor-pointer lg:hidden"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Apri Menu"
                >
                    <FontAwesomeIcon icon={faBars} color="#c22e35" size="lg" />
                </button>

                <div className="lg:justify-start">
                    <Logo src={logoSrc} contentTopRef={contentTopRef} />
                </div>

                <button
                    className="px-4 cursor-pointer"
                    aria-label="Cerca"
                    onClick={() => setIsModalOpen(true)}
                >

                    <FontAwesomeIcon icon={faSearch} color="#c22e35" size="lg" />
                </button>

                <ModaleRicerca isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </header>

    );
};

export default Header;
