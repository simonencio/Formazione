import { useState, useEffect } from "react";
import Content from "./components/Content";
import "./App.css"; // Assicurati che importi Tailwind

import {
  fetchPages,
  buildPageTree,
  loadPages,
  findPageBySlug,
  findParentPage2,
} from "./api/pagine";
import { handleUrlChange } from "./utils/url";
import { monkeyPatchHistoryMethod } from "./utils/history";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesTree, setPagesTree] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [currentAnchorId, setCurrentAnchorId] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Carica le pagine all'avvio
  useEffect(() => {
    loadPages(fetchPages, buildPageTree, setPagesTree);
  }, []);

  // Gestione URL e history
  useEffect(() => {
    const handleUrlChangeHandler = () =>
      handleUrlChange(
        pagesTree,
        setSelectedPage,
        setCurrentSlug,
        setIsFirstLoad,
        isFirstLoad,
        setCurrentAnchorId
      );

    window.history.pushState = monkeyPatchHistoryMethod("pushState");
    window.history.replaceState = monkeyPatchHistoryMethod("replaceState");

    window.addEventListener("popstate", handleUrlChangeHandler);
    window.addEventListener("locationchange", handleUrlChangeHandler);

    if (pagesTree.length > 0) {
      handleUrlChangeHandler();
    }

    return () => {
      window.removeEventListener("popstate", handleUrlChangeHandler);
      window.removeEventListener("locationchange", handleUrlChangeHandler);
    };
  }, [pagesTree, isFirstLoad]);

  const handleLinkClick = (slug, anchorId = null) => {
    const page = findPageBySlug(pagesTree, slug);
    if (page) {
      setSelectedPage(page);
      const parentPage = findParentPage2(pagesTree, page);

      let fullSlug = slug;
      if (parentPage) {
        fullSlug = `${parentPage.slug}/${slug}`;
      }

      const newUrl = `/${fullSlug}/`;
      window.history.pushState(null, "", anchorId ? `${newUrl}#${anchorId}` : newUrl);

      const top = document.getElementById("content-top");
      if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });

      setMenuOpen(false);
    }
  };

  return (
    <main className="app-main flex-grow overflow-hidden">
      <Content
        pagesTree={pagesTree}
        currentSlug={currentSlug}
        setCurrentAnchorId={setCurrentAnchorId}
        selectedPage={selectedPage}
        currentAnchorId={currentAnchorId}
        handleLinkClick={handleLinkClick}
      />
    </main>
  );
};

export default App;
