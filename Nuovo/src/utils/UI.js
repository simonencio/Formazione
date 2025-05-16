// Funzione per ottenere il colSpan del contenuto
export const getContentColSpan = (selectedPage) => {
    const lgColSpan = selectedPage?.anchors?.length ? "lg:col-span-8" : "lg:col-span-10 lg:pr-20";
    return `col-span-12 ${lgColSpan} flex justify-center pb-10`;
};

// Funzione per ottenere il colSpan del sidebar destro
export const getSidebarColSpan = () => {
    return "hidden lg:block lg:col-span-2 text-center sticky top-0 h-100 overflow-y-scroll hide-scrollbar";
};

// Costruisce uno slug completo combinando lo slug corrente con lo slug del genitore (se presente).

// Verifica se uno slug rappresenta il link attualmente attivo.
export const isActiveLink = (currentSlug, itemSlug) => {
    return currentSlug?.endsWith(itemSlug);
};