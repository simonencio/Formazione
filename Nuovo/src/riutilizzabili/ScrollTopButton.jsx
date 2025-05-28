import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollTopButton = ({ onClick, showScrollTopBtn, isHidingBtn, setShowScrollTopBtn }) => {
    const baseButtonClass = "fixed text-white w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform flex items-center justify-center hover:scale-130";
    const positionClasses = "lg:bottom-6 lg:right-6 md:bottom-5 md:right-5 bottom-4 right-4";
    const buttonBackgroundClass = "bg-[#C22E35]";

    return (
        showScrollTopBtn && (
            <button
                onClick={onClick}
                className={`${baseButtonClass} ${buttonBackgroundClass} ${positionClasses} ${isHidingBtn ? 'animate-slideOut' : 'animate-slideIn'}`}
                onAnimationEnd={(e) => {
                    if (e.animationName === "slideOut") {
                        setTimeout(() => {
                            setShowScrollTopBtn(false);
                        }, 100);
                    }
                }}
            >
                <svg className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6">
                    <FontAwesomeIcon icon={faArrowUp} />
                </svg>
            </button>
        )
    );
};

export default ScrollTopButton;
