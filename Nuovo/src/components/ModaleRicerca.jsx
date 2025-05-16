import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { executeSearch, handleResultClick } from "../utils/ricerca";
import { removeHistoryItem, handleHistoryClick } from "../utils/history";
import { scrollToHashAnchor } from "../utils/ancore";

const ModaleRicerca = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
            setSearchResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSearchHistory(storedHistory);
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            executeSearch(searchQuery, setSearchResults);
        }, 100);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    useEffect(() => {
        scrollToHashAnchor();
    }, [searchResults]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50" onClick={onClose}>
            <div className="modal-search-container p-6 rounded-lg w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cerca"
                        className="modal-search-input rounded-lg px-4 py-2 w-full pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="modal-search-icon absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                {searchResults.length > 0 && (
                    <div className="mt-4">
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>
                                    <button
                                        onClick={() => handleResultClick(result, navigate, setSearchHistory, setSearchQuery, onClose)}
                                        className="modal-search-result-btn block p-1 rounded transition w-full text-left"
                                    >
                                        {result.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchHistory.length > 0 && (
                    <div className="mt-4">
                        <h3 className="modal-search-history-title text-lg">Cronologia Ricerche</h3>
                        <ul className="modal-search-history-list space-y-2 mt-2">
                            {searchHistory.map((item, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <button
                                        className="flex-grow text-left hover:underline"
                                        onClick={() => handleHistoryClick(item, navigate, onClose, setSearchHistory)}
                                    >
                                        {item.title}
                                    </button>
                                    <button
                                        title="Rimuovi dalla cronologia"
                                        className="modal-search-history-remove-btn ml-4 cursor-pointer"
                                        onClick={() => removeHistoryItem(item, searchHistory, setSearchHistory)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModaleRicerca;
