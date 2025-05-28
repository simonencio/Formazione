import { findPageBySlug, findParentPage2 } from "../api/pagine";
import { scrollToAnchor } from "./ancore";

export const getFullSlug = (slug, parentSlug = "") => {
    return parentSlug ? `${parentSlug}/${slug}` : slug;
};
export const formatUrl = (link) => {
    try {
        const url = new URL(link);
        const pathParts = url.pathname.split("/").filter(Boolean);
        const formattedUrl = pathParts.length >= 2
            ? `/${pathParts.slice(-2).join("/")}`
            : "/";
        return formattedUrl;
    } catch (error) {
        console.error("Errore nel formato dell'URL", error);
        return "/";
    }
};
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `data:${day}/${month}/${year}`;
    const formattedTime = `ora:${hours}:${minutes}:${seconds}`;

    return {
        formattedDate,
        formattedTime
    };

};

export const handleUrlChange = (
    pagesTree,
    setSelectedPage,
    setCurrentSlug,
    setIsFirstLoad,
    isFirstLoad,
    setCurrentAnchorId // AGGIUNTO per supportare ancore
) => {
    if (!pagesTree || pagesTree.length === 0) return;

    // Rimuove slash iniziali/finali, estrae slug e ancora
    let path = window.location.pathname.replace(/^\/|\/$/g, "");
    const anchorId = window.location.hash.replace("#", "") || null;

    // Se lo slug è vuoto, forza "home"
    if (path === "") {
        path = "home";
        window.history.replaceState(null, "", "/home/");
    }

    const slugParts = path.split("/");
    const slug = slugParts[slugParts.length - 1]; // slug finale
    let page = findPageBySlug(pagesTree, slug);

    // Fallback: se pagina non trovata al primo load
    if (!page && isFirstLoad && pagesTree.length) {
        const [firstParent] = pagesTree;
        page = firstParent.children?.[0] || firstParent;
        if (page) {
            const fullSlug = firstParent ? `${firstParent.slug}/${page.slug}` : page.slug;
            window.history.replaceState(null, "", `/${fullSlug}/`);
        }
    }

    if (page) {
        const parent = findParentPage2(pagesTree, page);
        const fullSlug = parent ? `${parent.slug}/${page.slug}` : page.slug;

        setSelectedPage(page);
        setCurrentSlug(fullSlug);
        setIsFirstLoad(false);

        // Se presente, imposta ancora per scroll successivo
        if (setCurrentAnchorId && anchorId) {
            setCurrentAnchorId(anchorId);
        }
    }

    // Scrolla all’ancora se c’è
    if (anchorId) scrollToAnchor(anchorId);
};
