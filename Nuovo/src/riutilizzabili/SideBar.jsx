import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuGenerico from "../riutilizzabili/MenuGenerico"; // Importa MenuGenerico

import { handleAnchorClick } from "../utils/ancore"; // Funzione per gestire il click sull'ancora

// SidebarContainer che accetta i children
const SidebarContainer = ({ children }) => (
    <div className="hidden lg:flex flex-col items-center w-full">
        {children}
    </div>
);


// Componente principale SideBar
const SideBar = ({
    pagesTree,
    anchors,
    onLinkClick,
    onAnchorClick,
    currentSlug,
    currentAnchorId,
    isLeftSide
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Calcolo dinamico dello slug dalla pathname (solo per il lato sinistro)
    const currentSlugFromLocation = location.pathname.replace(/^\/|\/$/g, "");

    // Funzione di renderizzazione dei link (per il lato sinistro e destro)
    const renderLink = (slug, children) => (
        <Link
            to={`/${slug}`}
            className={`block p-2 rounded transition ${slug === currentSlug ? "" : ""}`}
            onClick={() => onLinkClick && onLinkClick(slug)} // Passiamo onLinkClick solo se esiste
        >
            {children}
        </Link>
    );

    return (
        <SidebarContainer>
            <MenuGenerico
                items={isLeftSide ? pagesTree : []} // Mostra le pagine solo nel lato sinistro
                anchors={anchors} // Passa le ancore a entrambi
                currentSlug={isLeftSide ? currentSlug || currentSlugFromLocation : currentAnchorId} // Usa currentSlug o currentAnchorId
                onLinkClick={isLeftSide ? onLinkClick : () => { }} // Passa onLinkClick solo nel lato sinistro
                onAnchorClick={isLeftSide ? onAnchorClick : (anchorId, e) => handleAnchorClick(anchorId, navigate, onAnchorClick)} // Gestisce il click per le ancore
                renderLink={renderLink} // Usa la funzione di renderizzazione dei link
            />
        </SidebarContainer>
    );
};

export default SideBar;
