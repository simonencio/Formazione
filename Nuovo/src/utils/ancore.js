export const generateAnchors = () => {
    const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], div[id]");
    const generatedAnchors = Array.from(headings)
        .filter(el => el.id?.trim() !== "")
        .map((el) => ({
            id: el.id,
            title: el.id,
        }));

    return generatedAnchors;
};

// Funzione per osservare gli anchor visibili e aggiornare l'ID dell'anchor attivo



export const isAnchorActive = (currentAnchorId, anchorId) => currentAnchorId === anchorId;



// estrae gli ID delle ancore direttamente da una stringa HTML
export const extractAnchorsFromHTML = (content, pageTitle) => {
    const anchors = [];
    const anchorRegex = /id="([^"]+)"/g;
    let match;

    while ((match = anchorRegex.exec(content))) {
        anchors.push({
            id: match[1],
            title: match[1],
            pageTitle,
        });
    }

    return anchors;
};
export const observeAnchors = (setCurrentAnchorId, currentAnchorId, onAnchorChange) => {
    const observer = new IntersectionObserver(
        (entries) => {
            const visibleAnchors = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visibleAnchors.length > 0) {
                const topVisible = visibleAnchors[0].target.id;
                if (topVisible !== currentAnchorId) {
                    setCurrentAnchorId(topVisible);
                    if (onAnchorChange) onAnchorChange(topVisible);
                }
            } else {
                setCurrentAnchorId(null);
                if (onAnchorChange) onAnchorChange(null);
            }
        },
        {
            rootMargin: "0px 0px 0px 0px", // Quando un'ancora entra nel 80% del viewport
            threshold: 0,
        }
    );

    const elements = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], div[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup observer
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const scrollToElementById = (id, options = { behavior: "smooth", block: "start" }) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView(options);
        return true;
    }
    return false;
};


export const handleAnchorClick = (anchorId, navigate, onAnchorClick) => {
    const event = new Event('anchor-click');
    event.preventDefault();

    onAnchorClick(anchorId);
    navigate(`#${anchorId}`, { replace: true });

    scrollToElementById(anchorId, {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};


export const scrollToHashAnchor = () => {
    const id = window.location.hash.substring(1);
    if (id) scrollToElementById(id);
};


export const scrollToAnchor = (anchorId, setCurrentAnchorId, setPendingAnchorScroll) => {
    if (scrollToElementById(anchorId)) {
        if (typeof setCurrentAnchorId === "function") {
            setCurrentAnchorId(anchorId);
        }
        if (typeof setPendingAnchorScroll === "function") {
            setPendingAnchorScroll(null);
        }
    }
};
