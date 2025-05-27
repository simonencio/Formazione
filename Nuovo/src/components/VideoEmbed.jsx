import ReactPlayer from "react-player";

const VideoEmbed = ({ src, index }) => {
    if (!ReactPlayer.canPlay(src)) {
        return null;
    }

    return (
        <div key={`video-${index}`} className="w-full flex justify-start pt-10">
            <div className="inline-block w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] aspect-[16/9] relative">
                <ReactPlayer
                    url={src}
                    className="absolute top-0 left-0"
                    width="100%"
                    height="100%"
                    controls
                    config={{
                        youtube: {
                            playerVars: {
                                origin: window.location.origin,
                                modestbranding: 1,
                            },
                        },
                        vimeo: {
                            playerOptions: {
                                responsive: true,
                            },
                        },
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                preload: 'metadata',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default VideoEmbed;
