export const handleLogoClick = (e, setCurrentAnchorId) => {
    e.preventDefault();

    const topElement = document.getElementById("content-top");
    if (topElement) {
        topElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Emissione evento globale
    window.dispatchEvent(new CustomEvent("logoClicked"));

    // Reset dello stato dell'àncora
    resetAnchorState(setCurrentAnchorId);
};


export const setupLogoEvents = (setCurrentAnchorId) => {
    const handleLogoEvent = () => {
        resetAnchorState(setCurrentAnchorId); // Riutilizzo della funzione
    };

    const handleScrollToTopEvent = () => {
        resetAnchorState(setCurrentAnchorId); // Riutilizzo della funzione
    };

    window.addEventListener("logoClicked", handleLogoEvent);
    window.addEventListener("scrollToTopClicked", handleScrollToTopEvent);

    // Clean-up event listeners
    return () => {
        window.removeEventListener("logoClicked", handleLogoEvent);
        window.removeEventListener("scrollToTopClicked", handleScrollToTopEvent);
    };
};



export const resetAnchorState = (setCurrentAnchorId) => {
    if (typeof setCurrentAnchorId === "function") {
        setCurrentAnchorId(null);
    }
};

// Gestione del click sul logo
export const handleLogoMenuClose = (e, setMenuOpen, setCurrentAnchorId, contentTopRef) => {
    setMenuOpen(false);
    handleLogoClick(e, setCurrentAnchorId, contentTopRef);
};
