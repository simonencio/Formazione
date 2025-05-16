import { Link } from "react-router-dom";
import Logo from "../riutilizzabili/Logo";
import { useEffect, useState } from "react";

import { fetchPages } from "../api/pagine";

const Footer = ({ contentTopRef }) => {
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

                {pages.length > 0 ? (
                    pages.map(page => (
                        <Link key={page.id} to={`/${page.slug}`} className="footer-links mx-2">
                            {page.title.rendered}
                        </Link>
                    ))
                ) : (
                    <p className="footer-links mx-2">Le pagine non sono disponibili.</p>
                )}

                <div className="p-5">
                    <Logo src={logoSrc} contentTopRef={contentTopRef} />
                </div>
            </div>
        </footer>

    );
};

export default Footer;
