import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPages } from "../api/pagine";

const Footer = () => {
    const [pages, setPages] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener("change", handleChange);

        return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }, []);

    const logoSrc = isDarkMode ? "/kalimero_logo2.png" : "/kalimero_logo.png";

    useEffect(() => {
        const getPages = async () => {
            try {
                const pagesData = await fetchPages();
                const filteredPages = pagesData.filter(
                    page => page.slug === "privacy-policy" || page.slug === "cookie-policy"
                );
                setPages(filteredPages);
            } catch (error) {
                console.error("Errore nel recupero delle pagine:", error);
            }
        };

        getPages();
    }, []);

    return (
        <footer className="footer-container p-4 text-center">
            <div className="mt-2 items-center">
                <p>&copy; 2025 Kalimero, Inc. | All Rights Reserved</p>


                <Link to='https://www.kalimero.it/privacy-policy/' target="_blank" className="footer-links mx-2" rel="noopener noreferrer">
                    Privacy Policy
                </Link>


                <div className="p-5">
                    <a href="https://www.kalimero.it/" target="_blank" className="flex-1 flex items-center justify-center" rel="noopener noreferrer">
                        <img
                            src={logoSrc}
                            alt="Logo Kalimero"
                            className="w-[150px] lg:w-[200px] h-auto cursor-pointer "
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
