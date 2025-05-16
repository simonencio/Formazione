import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollTopButton = ({ onClick, showScrollTopBtn, isHidingBtn, setShowScrollTopBtn }) => {
    const baseButtonClass = "fixed text-white w-7 h-7 md:w-8.5 md:h-8.5  lg:w-10 lg:h-10  rounded-full shadow-lg transition-transform transform flex items-center justify-center";
    const positionClasses = " lg:bottom-6 lg:right-6 md:bottom-4 md:right-4 bottom-2 right-2";
    const buttonBackgroundClass = "bg-[#C22E35]"; // Aggiungi il colore di sfondo rosso

    return (
        showScrollTopBtn && (
            <button
                onClick={onClick}
                className={`${baseButtonClass} ${buttonBackgroundClass} ${positionClasses} ${isHidingBtn ? 'animate-slideOut' : 'animate-slideIn'}`}
                style={{ transition: "transform 0.3s ease-in-out" }}
                onAnimationEnd={(e) => {
                    if (e.animationName === "slideOut") {
                        setTimeout(() => {
                            setShowScrollTopBtn(false);
                        }, 100);
                    }
                }}
            >
                <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                    <FontAwesomeIcon icon={faArrowUp} />
                </svg>
            </button>
        )
    );
};

export default ScrollTopButton;
