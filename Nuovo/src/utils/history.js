import { formatTimestamp } from "./url";
export const saveSearchHistoryItem = (item, setSearchHistory, maxItems = 7) => {
    const currentHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    const updatedHistory = [
        item,
        ...currentHistory.filter(h => h.title !== item.title),
    ].slice(0, maxItems);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
};
export const scheduleHistoryExpiration = (item, setSearchHistory, expiration = 7 * 24 * 60 * 60 * 1000) => {
    setTimeout(() => {
        const currentHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        const stillExists = currentHistory.find(
            h => h.title === item.title && h.timestamp === item.timestamp
        );
        if (stillExists) {
            const updatedHistory = currentHistory.filter(
                h => !(h.title === item.title && h.timestamp === item.timestamp)
            );
            localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
            setSearchHistory(updatedHistory);
        }
    }, expiration);
};

export const updateSearchHistory = (title, link, setSearchHistory) => {
    const now = Date.now();
    const { formattedDate, formattedTime } = formatTimestamp(now);
    const newItem = { title, link, timestamp: `${formattedDate} ${formattedTime}` };

    saveSearchHistoryItem(newItem, setSearchHistory);
    scheduleHistoryExpiration(newItem, setSearchHistory);
};

export const handleHistoryClick = (item, navigate, onClose, setSearchHistory) => {
    const now = Date.now();
    const { formattedDate, formattedTime } = formatTimestamp(now);
    const updatedItem = { ...item, timestamp: `${formattedDate} ${formattedTime}` };

    saveSearchHistoryItem(updatedItem, setSearchHistory);
    scheduleHistoryExpiration(updatedItem, setSearchHistory);

    navigate(item.link || "/", { replace: true });
    onClose();
};





export const removeHistoryItem = (item, searchHistory, setSearchHistory) => {
    const updated = searchHistory.filter(historyItem => historyItem.title !== item.title);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
};






export const monkeyPatchHistoryMethod = (method) => {
    const original = window.history[method];
    return function (...args) {
        const result = original.apply(this, args);
        window.dispatchEvent(new Event("locationchange"));
        return result;
    };
};
