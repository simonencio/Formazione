import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../riutilizzabili/useThemeMode";

const Footer = () => {
    const { isDarkMode } = useTheme();

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showLogoTooltip, setShowLogoTooltip] = useState(false);
    const [showLinkTooltip, setShowLinkTooltip] = useState(false);

    const logoSrc = isDarkMode ? "/kalimero_logo2.png" : "/kalimero_logo.png";

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Funzione per controllare se siamo sopra md
    const isAboveMd = () => window.innerWidth >= 768;

    // Wrapper per mostrare tooltip solo se sopra md
    const handleLogoMouseEnter = () => {
        if (isAboveMd()) setShowLogoTooltip(true);
    };
    const handleLogoMouseLeave = () => {
        setShowLogoTooltip(false);
    };

    const handleLinkMouseEnter = () => {
        if (isAboveMd()) setShowLinkTooltip(true);
    };
    const handleLinkMouseLeave = () => {
        setShowLinkTooltip(false);
    };

    // Optional: se vuoi fare un reset tooltip quando ridimensioni la finestra sotto md
    useEffect(() => {
        const onResize = () => {
            if (!isAboveMd()) {
                setShowLogoTooltip(false);
                setShowLinkTooltip(false);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <footer
            className={`footer-container p-4 text-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
            onMouseMove={handleMouseMove}
        >
            <div className="mt-2 items-center relative">
                <p>MIG S.r.l.s. &copy; 2025 • P.IVA: 01629230531 • N.REA: GR-206496</p>

                <div className="flex justify-center mt-2">
                    <Link
                        to="https://www.kalimero.it/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`footer-links mx-2 hover:text-[#c22e35] ${isDarkMode ? "text-gray-400" : "text-gray-700"
                            }`}
                        onMouseEnter={handleLinkMouseEnter}
                        onMouseLeave={handleLinkMouseLeave}
                    >
                        Privacy Policy
                    </Link>
                </div>

                <div className="p-5 flex justify-center">
                    <a
                        href="https://www.kalimero.it/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleLogoMouseEnter}
                        onMouseLeave={handleLogoMouseLeave}
                    >
                        <img
                            src={logoSrc}
                            alt="Logo Kalimero"
                            className="w-[150px] lg:w-[200px] h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-130 hover:shadow-xl"
                        />
                    </a>
                </div>

                {showLogoTooltip && (
                    <div
                        className="fixed z-50 px-3 py-1 text-sm bg-black text-white rounded pointer-events-none"
                        style={{
                            top: mousePos.y + 20,
                            left: mousePos.x + 20,
                        }}
                    >
                        Vai al sito Kalimero.it
                    </div>
                )}

                {showLinkTooltip && (
                    <div
                        className="fixed z-50 px-3 py-1 text-sm bg-black text-white rounded pointer-events-none"
                        style={{
                            top: mousePos.y + 20,
                            left: mousePos.x + 20,
                        }}
                    >
                        Visualizza Privacy Policy
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
