export const extractYouTubeId = (src) => {
    try {
        const url = new URL(src);
        const path = url.pathname.split("/");
        const embedIndex = path.findIndex((p) => p === "embed");
        return embedIndex !== -1 ? path[embedIndex + 1] : null;
    } catch {
        return null;
    }
};
