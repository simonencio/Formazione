import { searchPages } from "../api/pagine";
import { updateSearchHistory } from "./history";
import { scrollToTop } from "./scroll";
import { formatUrl } from "./url";

export const executeSearch = async (query, setResultsCallback) => {
    if (!query.trim()) {
        setResultsCallback([]);
        return;
    }

    try {
        const results = await searchPages(query);
        const filteredResults = results.flatMap(result => filterResults(result, query));
        setResultsCallback(filteredResults.slice(0, 6));
    } catch (err) {
        console.error("Errore ricerca:", err);
        setResultsCallback([]);
    }
};


export const handleResultClick = (result, navigate, setSearchHistory, setSearchQuery, onClose) => {
    if (!result.resultUrl.includes("#")) {
        scrollToTop(); // Usa la funzione riutilizzabile
    }

    navigate(result.resultUrl);
    updateSearchHistory(result.title, result.resultUrl, setSearchHistory);
    setSearchQuery("");
    onClose();
};



const filterResults = (result, query) => {
    const matchesQuery = (text) => text.toLowerCase().includes(query.toLowerCase());

    const pageMatches = matchesQuery(result.title.rendered) &&
        !result.link.includes("privacy-policy") && !result.link.includes("cookie-policy")
        ? [{ ...result, title: result.title.rendered, resultUrl: formatUrl(result.link) }]
        : [];

    const anchorMatches = result.anchors.filter(anchor =>
        matchesQuery(anchor.title)
    ).map(anchor => ({
        id: `/#${anchor.id}`,
        title: `${result.title.rendered} → ${anchor.title}`,
        resultUrl: `${formatUrl(result.link)}/#${anchor.id}`,
    }));

    return [...pageMatches, ...anchorMatches];
};

