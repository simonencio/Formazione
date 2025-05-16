import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Liste, Titoli } from "../riutilizzabili/Layout";

import { getFullSlug } from "../utils/url";
import { isActiveLink } from "../utils/UI";
import { scrollToAnchor } from "../utils/ancore";

// Componente LinkItem interno
const LinkItem = ({

    slug,
    label,
    isActive,
    onClick,
    parentSlug = "",
    currentSlug,
    id,
    type = "menu" // 'menu' o 'anchor'
}) => {

    const navigate = useNavigate();
    const fullSlug = slug ? getFullSlug(slug, parentSlug) : "";
    const href = type === "menu" ? `/${fullSlug}/` : `#${id}`;

    const handleClick = (e) => {
        e.preventDefault();
        onClick?.(slug || id, e);
        if (type === "menu") {
            if (currentSlug === href) return;
            navigate(href);
        } else if (type === "anchor") {
            if (currentSlug === href) return;
            scrollToAnchor(id);
            navigate(`#${id}`, { replace: true });
        }
    };

    const baseClass = "block w-fit px-2 py-1 rounded transition-colors font-semibold";
    const activeClass = isActive ? "bg-[#C22E35] text-white" : "hover:bg-gray-300 dark:hover:bg-gray-700";

    return (
        <Link to={href} onClick={handleClick} className={`${baseClass} ${activeClass}`}>
            {label || id}
        </Link>
    );
};

// Componente principale
const MenuGenerico = ({
    items,
    currentSlug,
    onLinkClick,
    className = "",
    anchors = [],
    onAnchorClick
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", checkMobile);
        checkMobile();
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const findPageById = (pages, id) => {
        for (const page of pages) {
            if (page.id === id) return page;
            if (page.children?.length) {
                const found = findPageById(page.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const renderMenuLinks = (items, parentSlug = "") =>
        items
            .filter(item => item.slug !== "privacy-policy" && item.slug !== "cookie-policy") // Filtra le pagine
            .map((item) => {
                const label = item.title.rendered;
                const isActive = isActiveLink(currentSlug, item.slug);
                const parentPage = findPageById(items, item.parent);

                return (
                    <li key={item.slug} className="w-full my-1">
                        {item.parent && item.parent !== 0 ? (
                            <LinkItem
                                type="menu"
                                slug={item.slug}
                                label={label}
                                isActive={isActive}
                                onClick={onLinkClick}
                                parentSlug={parentSlug}
                                currentSlug={currentSlug}
                            />
                        ) : (
                            <Titoli>{label}</Titoli>
                        )}
                        {item.children?.length > 0 && (
                            <Liste className="ml-2">
                                {renderMenuLinks(item.children, item.slug)}
                            </Liste>
                        )}
                    </li>
                );
            });


    const renderAnchorLinks = (items) =>
        items.map((item) => {
            const isActive = currentSlug === item.id;
            return (
                <li key={item.id} className={`w-full my-1 ${isActive ? "active" : ""}`}>
                    <LinkItem
                        type="anchor"
                        id={item.id}
                        label={item.title}
                        isActive={isActive}
                        onClick={() => onAnchorClick?.(item.id)}
                        currentSlug={currentSlug}
                    />
                    {item.children?.length > 0 && (
                        <ul className="pl-4 border-l border-gray-300">
                            {renderAnchorLinks(item.children)}
                        </ul>
                    )}
                </li>
            );
        });

    return (
        <div className={`${className}`}>
            <Liste>
                {items?.length > 0 && renderMenuLinks(items)}
                {anchors?.length > 0 && renderAnchorLinks(anchors)}
            </Liste>
        </div>
    );
};

export default MenuGenerico;
