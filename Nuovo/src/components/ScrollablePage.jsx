import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import VideoEmbed from "./VideoEmbed";

import { tagMap } from "../utils/tagMap";
import { scrollToTop } from "../utils/scroll";
import { generateAnchors, observeAnchors } from "../utils/ancore";

const ScrollablePage = ({ page, parent, onAnchorChange }) => {
    const [anchors, setAnchors] = useState([]);
    const [currentAnchorId, setCurrentAnchorId] = useState(null);

    const content = typeof page.content?.rendered === "string" ? page.content.rendered : "";

    const transform = (node, index) => {
        if (node.type !== "tag") return;

        const { name, attribs = {}, children } = node;

        if (name === "iframe" && attribs.src && attribs.src.startsWith("https://")) {
            let src = attribs.src;

            if (src.includes("youtube.com")) {
                src = src.replace("youtube.com", "youtube-nocookie.com");
            } else if (src.includes("youtu.be")) {
                const videoId = src.split("/").pop();
                src = `https://www.youtube-nocookie.com/embed/${videoId}`;
            }
            return <VideoEmbed key={`video-${index}`} src={src} index={index} />;
        }

        // 🏷️ Gestione intestazioni e paragrafi
        if (tagMap[name]) {
            const Tag = name;
            const id = attribs.id || node.id;
            return (
                <Tag key={`${name}-${index}`} className={tagMap[name]} id={id}>
                    {domToReact(children, { replace: transform })}
                </Tag>
            );
        }

        // 🖼️ Gestione immagini
        if (name === "img") {
            return (
                <img
                    key={`img-${index}`}
                    src={attribs.src}
                    alt={attribs.alt || ""}
                    loading="lazy"
                    className="my-4 max-w-full h-auto rounded"
                />
            );
        }
    };

    useEffect(() => {
        scrollToTop(); // Scroll to top on page change
    }, [page]);

    const parsedContent = parse(content, { replace: transform });

    useEffect(() => {
        const generatedAnchors = generateAnchors();
        setAnchors(generatedAnchors);
    }, [page]);

    useEffect(() => {
        const cleanupObserver = observeAnchors(setCurrentAnchorId, currentAnchorId, onAnchorChange);
        return cleanupObserver;
    }, [page, currentAnchorId, onAnchorChange]);

    return (
        <section id="content-top" className="text-start px-4 lg:px-0">
            {parent && (
                <h1 className={tagMap.h1}>
                    {parent.title.rendered}
                </h1>
            )}

            {page.slug === "home" ? (
                <h1 className={tagMap.h1}>{page.title.rendered}</h1>
            ) : (
                <h2 className={tagMap.h2}>{page.title.rendered}</h2>
            )}

            <div>{parsedContent}</div>
        </section>
    );
};

export default ScrollablePage;
