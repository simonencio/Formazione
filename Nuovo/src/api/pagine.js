import axios from 'axios';
import { extractAnchorsFromHTML } from '../utils/ancore';


const API_URL = 'http://localhost/Nuovo/wp-json/wp/v2/pages';

// Pagine
export const fetchPages = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                per_page: 100,
                orderby: 'date',
                order: 'asc',
            },
        });

        if (response.status === 200) {
            const pages = response.data;



            return pages;
        } else {
            throw new Error('Errore nel recupero delle pagine');
        }
    } catch (error) {
        throw error;
    }
};

//###################################################################################################################

export function buildPageTree(pages) {
    const pagesById = {};
    const rootPages = [];

    pages.forEach(page => {
        const content = page.content?.rendered || "";
        pagesById[page.id] = {
            ...page,
            children: [],
            anchors: extractAnchorsFromHTML(content),
        };
    });

    pages.forEach(page => {
        const node = pagesById[page.id];
        if (page.parent && pagesById[page.parent]) {
            pagesById[page.parent].children.push(node);
        } else {
            rootPages.push(node);
        }
    });
    return rootPages;
}

export const searchPages = async (query) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                search: query,
                per_page: 100,
                orderby: 'menu_order',
                order: 'asc',
                _embed: true,
            },
        });

        if (response.status === 200) {
            // Filtra le pagine parent (dove parent !== 0) direttamente qui
            const filteredPages = response.data.filter(page => page.parent !== 0);

            // Aggiungi le ancore alle pagine
            const pagesWithAnchors = await Promise.all(filteredPages.map(async (page) => {
                const anchors = extractAnchorsFromHTML(page.content.rendered, page.title.rendered);
                return { ...page, anchors };
            }));

            return pagesWithAnchors;
        } else {
            throw new Error('Errore nella ricerca delle pagine');
        }
    } catch (error) {
        throw error;
    }
};
export const findParentPage2 = (tree, child) => {
    for (const page of tree) {
        if (page.children?.some((c) => c.id === child.id)) {
            return page;
        }
        if (page.children?.length) {
            const found = findParentPage2(page.children, child);
            if (found) return found;
        }
    }
    return null;
};

// Carica e costruisce un "albero" di pagine
export const loadPages = async (fetchPages, buildPageTree, setPagesTree) => {
    try {
        const pages = await fetchPages();
        setPagesTree(buildPageTree(pages));
    } catch (err) {
        console.error("Errore nel caricamento delle pagine", err);
    }
};

export const findPageBySlug = (pages, slug) => {
    for (const page of pages) {
        if (page.slug === slug) return page;
        const found = page.children?.length && findPageBySlug(page.children, slug);
        if (found) return found;
    }
    return null;
};
