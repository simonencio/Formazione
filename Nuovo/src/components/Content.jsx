import { useState, useEffect } from "react";
import ScrollablePage from "./ScrollablePage";
import SideBar from "../riutilizzabili/SideBar";
import Footer from "./Footer";
import Header from "./Header";
import Offcanvas from "./Offcanvas";
import { GridLayout } from "../riutilizzabili/Layout";
import ScrollTopButton from "../riutilizzabili/ScrollTopButton";


import { findParentPage2 } from "../api/pagine";
import { handleScrollVisibility, addScrollListener, scrollToTop } from "../utils/scroll";
import { getContentColSpan, getSidebarColSpan } from "../utils/UI";
import { tagMap } from "../utils/tagMap";

const Content = ({
    pagesTree, setCurrentAnchorId, selectedPage, currentAnchorId, handleLinkClick, currentSlug,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
    const [isHidingBtn, setIsHidingBtn] = useState(false);
    const [pendingAnchorId, setPendingAnchorId] = useState(null);

    const handleScroll = () => handleScrollVisibility(showScrollTopBtn, isHidingBtn, setShowScrollTopBtn, setIsHidingBtn);

    useEffect(() => {
        const navEntries = performance.getEntriesByType("navigation");
        const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

        if (isReload) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
            setCurrentAnchorId(null);
        }
    }, []);

    useEffect(() => {
        const anchorId = window.location.hash.replace("#", "");
        if (anchorId) {
            setTimeout(() => {
                const element = document.getElementById(anchorId);
                if (element) {
                    window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: "smooth",
                    });
                    setCurrentAnchorId(anchorId);
                }
            }, 200);
        }
    }, [selectedPage]);

    useEffect(() => {
        const cleanupScrollListener = addScrollListener(handleScroll, setShowScrollTopBtn, setIsHidingBtn);
        return cleanupScrollListener;
    }, [showScrollTopBtn, isHidingBtn]);

    const handleScrollTopClick = () => {
        scrollToTop(setCurrentAnchorId, true);
    };

    const contentColSpan = getContentColSpan(selectedPage);
    const sidebarColSpan = getSidebarColSpan();

    useEffect(() => {
        const anchorId = window.location.hash.replace("#", "");
        if (anchorId) {
            setPendingAnchorId(anchorId);
        }
    }, [currentSlug]);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="sticky z-[1020]">
                <Header setMenuOpen={setMenuOpen} />
                <Offcanvas
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    pagesTree={pagesTree}
                    currentSlug={currentSlug}
                    onLinkClick={handleLinkClick}
                />
            </div>

            <div className="flex-grow overflow-y-auto pt-5 hide-scrollbar">
                <GridLayout>
                    <div className={`${sidebarColSpan}`}>
                        <SideBar
                            pagesTree={pagesTree}
                            onLinkClick={handleLinkClick}
                            currentSlug={currentSlug}
                            isLeftSide={true}
                        />
                    </div>
                    <div className={`${contentColSpan}`}>
                        <div className="w-full">
                            {selectedPage && (
                                <ScrollablePage
                                    page={selectedPage}
                                    parent={findParentPage2(pagesTree, selectedPage)}
                                    onAnchorChange={(id) => setCurrentAnchorId(id)}
                                    pendingAnchorId={pendingAnchorId}
                                />
                            )}
                        </div>
                    </div>
                    {selectedPage?.anchors?.length > 0 && (
                        <div className={`${sidebarColSpan} `}>
                            <h5 className={`${tagMap.h5}`}>In questa pagina:</h5>
                            <SideBar
                                anchors={selectedPage.anchors}
                                onAnchorClick={(id) => setCurrentAnchorId(id)}
                                currentAnchorId={currentAnchorId}
                                isLeftSide={false}
                            />
                        </div>
                    )}
                </GridLayout>

                <Footer />
            </div>
            <ScrollTopButton
                onClick={handleScrollTopClick}
                showScrollTopBtn={showScrollTopBtn}
                isHidingBtn={isHidingBtn}
                setShowScrollTopBtn={setShowScrollTopBtn}
            />
        </div>
    );
};

export default Content;
