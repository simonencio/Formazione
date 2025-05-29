import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Liste, Titoli } from "../riutilizzabili/Layout";
import { getFullSlug } from "../utils/url";
import { isActiveLink } from "../utils/UI";
import { scrollToAnchor } from "../utils/ancore";
import { useTheme } from "../riutilizzabili/useThemeMode";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const LinkItem = ({
    slug,
    label,
    isActive,
    onClick,
    parentSlug = "",
    currentSlug,
    id,
    type = "menu",
}) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const fullSlug = slug ? getFullSlug(slug, parentSlug) : "";
    const href = type === "menu" ? `/${fullSlug}/` : `#${id}`;

    const handleClick = (e) => {
        e.preventDefault();
        onClick?.(slug || id, e, parentSlug); // Passa parentSlug al click
        if (type === "menu") {
            if (currentSlug === href) return;
            navigate(href);
        } else if (type === "anchor") {
            if (currentSlug === href) return;
            scrollToAnchor(id);
            navigate(`#${id}`, { replace: true });
        }
    };

    const baseClass = `
      block w-fit px-2 py-1 rounded transition-colors font-semibold text-start text-md
      ${isDarkMode ? "text-white" : "text-black"}
    `;

    const hoverClass = isActive
        ? "hover:bg-[#C22E35]"
        : isDarkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-300";

    const activeClass = isActive ? "bg-[#C22E35] text-white" : "";

    return (
        <Link
            to={href}
            onClick={handleClick}
            className={`${baseClass} ${hoverClass} ${activeClass}`}
        >
            {label || id}
        </Link>
    );
};

const MenuGenerico = ({
    items,
    currentSlug,
    onLinkClick,
    className = "",
    anchors = [],
    onAnchorClick,
}) => {
    const [openParent, setOpenParent] = useState(null);
    const { isDarkMode } = useTheme();

    const toggleParent = (slug) => {
        setOpenParent((prev) => (prev === slug ? null : slug));
    };

    // Quando clicco un link figlio apro automaticamente il suo parent
    const handleLinkClick = (slug, e, parentSlug) => {
        if (parentSlug) {
            setOpenParent(parentSlug);
        } else {
            setOpenParent(null);
        }
        onLinkClick?.(slug, e);
    };

    // All’avvio o cambio currentSlug apro il parent relativo (prima parte dello slug)
    useEffect(() => {
        if (currentSlug) {
            const firstPart = currentSlug.split("/")[0];
            setOpenParent(firstPart);
            // Per debug
            // console.log("currentSlug:", currentSlug, "parentToOpen:", firstPart);
        }
    }, [currentSlug]);

    const renderMenuLinks = (items, parentSlug = "") =>
        items
            .filter(
                (item) =>
                    item.slug !== "privacy-policy" &&
                    item.slug !== "cookie-policy" &&
                    item.slug !== "home"
            )
            .map((item) => {
                const label = item.title.rendered;
                const isActive = !item.children?.length && isActiveLink(currentSlug, item.slug);

                if (item.children?.length > 0) {
                    return (
                        <li key={item.slug} className="w-fit my-1">
                            <button
                                onClick={() => toggleParent(item.slug)}
                                className={`w-full text-left px-2 py-1 font-semibold rounded hover:${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
                                aria-expanded={openParent === item.slug}
                                aria-controls={`${item.slug}-children`}
                            >
                                {label}
                                <span className="ml-2">
                                    <FontAwesomeIcon
                                        icon={openParent === item.slug ? faChevronUp : faChevronDown}
                                        size="xs"
                                    />
                                </span>
                            </button>
                            {openParent === item.slug && (
                                <Liste
                                    id={`${item.slug}-children`}
                                    className="pl-4 mt-1 border-l border-gray-300 dark:border-gray-600"
                                >
                                    {renderMenuLinks(item.children, item.slug)}
                                </Liste>
                            )}
                        </li>
                    );
                }

                if (item.parent && item.parent !== 0) {
                    return (
                        <li key={item.slug} className="w-fit my-1">
                            <LinkItem
                                type="menu"
                                slug={item.slug}
                                label={label}
                                isActive={isActive}
                                onClick={handleLinkClick} // Usa handleLinkClick con parentSlug
                                parentSlug={parentSlug}
                                currentSlug={currentSlug}
                            />
                        </li>
                    );
                }

                return (
                    <li key={item.slug} className="w-fit my-1">
                        <Titoli>{label}</Titoli>
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
        <div className={className}>
            <Liste>
                {items?.length > 0 && renderMenuLinks(items)}
                {anchors?.length > 0 && renderAnchorLinks(anchors)}
            </Liste>
        </div>
    );
};

export default MenuGenerico;
