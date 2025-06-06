import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuGenerico from "../riutilizzabili/MenuGenerico";
import Logo from "../riutilizzabili/Logo";

import { scrollToTop } from "../utils/scroll";
import { scrollToAnchor, observeAnchors, generateAnchors } from "../utils/ancore";
import { setupLogoEvents } from "../utils/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "../riutilizzabili/useThemeMode";

const Offcanvas = ({ menuOpen, setMenuOpen, pagesTree, currentSlug, onLinkClick, contentTopRef }) => {
    const { isDarkMode } = useTheme();
    const [anchors, setAnchors] = useState([]);
    const [currentAnchorId, setCurrentAnchorId] = useState(null);
    const [pendingAnchorScroll, setPendingAnchorScroll] = useState(null);
    const navigate = useNavigate();

    const logoSrc = isDarkMode ? "/kalimero_logo2.png" : "/kalimero_logo.png";

    const handleLinkClick = (slug) => {
        onLinkClick(slug);
        setMenuOpen(false);
        navigate(`/${slug}`);
    };

    const handleAnchorClick = (anchorId) => {
        setMenuOpen(false);
        setPendingAnchorScroll(anchorId);
    };

    useEffect(() => {
        if (menuOpen) {
            const generatedAnchors = generateAnchors();
            setAnchors(generatedAnchors);
        }
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen && pendingAnchorScroll) {
            scrollToAnchor(pendingAnchorScroll, setCurrentAnchorId, setPendingAnchorScroll, contentTopRef);
        }
    }, [menuOpen, pendingAnchorScroll, contentTopRef]);

    useEffect(() => {
        const cleanupLogoEvents = setupLogoEvents(setCurrentAnchorId);
        return () => cleanupLogoEvents();
    }, []);

    useEffect(() => {
        const cleanupObserver = observeAnchors(setCurrentAnchorId, currentAnchorId, setCurrentAnchorId);
        return cleanupObserver;
    }, [currentAnchorId]);

    useEffect(() => {
        const handleScroll = () => {
            const anchors = document.querySelectorAll('.anchor');
            anchors.forEach((anchor) => {
                const rect = anchor.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight) {
                    const anchorId = anchor.getAttribute('id');
                    setCurrentAnchorId(anchorId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {menuOpen && (
                <div className="fixed inset-0 z-[999]">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
                    <div
                        className={`offcanvas-container absolute left-0 top-0 h-full w-full max-w-2xs shadow-lg transition-transform transform
                            ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}
                    >
                        <div className={`h-full overflow-y-auto p-4 offcanvas-content hide-scrollbar`}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="justify-start">
                                    <Logo
                                        src={logoSrc}
                                        contentTopRef={contentTopRef}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMenuOpen(false);
                                            navigate("/home");
                                        }}
                                    />
                                </div>
                                <button aria-label="Chiudi menu" className="pl-0" onClick={() => setMenuOpen(false)}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="lg"
                                        className={`pr-3 ${isDarkMode ? "text-white" : "text-black"}`}
                                    />
                                </button>
                            </div>

                            <MenuGenerico
                                items={pagesTree}
                                currentSlug={currentSlug}
                                onLinkClick={handleLinkClick}
                                className="space-y-4"
                            />

                            <hr className={`offcanvas-divider my-4 ${isDarkMode ? "border-gray-300" : "border-gray-700"}`} />

                            {anchors.length > 0 && (
                                <MenuGenerico
                                    items={[]}
                                    anchors={anchors}
                                    currentSlug={currentAnchorId}
                                    onAnchorClick={handleAnchorClick}
                                    className="space-y-4"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Offcanvas;
