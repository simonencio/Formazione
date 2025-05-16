



export const addScrollListener = (handleScroll) => {
    const scrollableContent = document.querySelector('.flex-grow.overflow-y-auto');
    scrollableContent.addEventListener("scroll", handleScroll);

    return () => {
        scrollableContent.removeEventListener("scroll", handleScroll);
    };
};
// Funzione per gestire lo scroll e la visibilità del pulsante scrollTop
export const handleScrollVisibility = (showScrollTopBtn, isHidingBtn, setShowScrollTopBtn, setIsHidingBtn) => {
    const scrollableContent = document.querySelector('.flex-grow.overflow-y-auto');
    const scrollTop = scrollableContent.scrollTop;

    if (scrollTop > 200) {
        if (!showScrollTopBtn) {
            setShowScrollTopBtn(true);
        }
        setIsHidingBtn(false);
    } else {
        if (showScrollTopBtn && !isHidingBtn) {
            setIsHidingBtn(true);
        }
    }
};


export const scrollToTop = (setCurrentAnchorId = null, removeHash = false) => {
    if (removeHash && window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const topElement = document.getElementById("content-top");
    if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (typeof setCurrentAnchorId === "function") {
        setCurrentAnchorId(null);
    }

    // Emit event if needed
    window.dispatchEvent(new CustomEvent("scrollToTopClicked"));
};


