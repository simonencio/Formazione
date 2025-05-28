import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faGear } from "@fortawesome/free-solid-svg-icons";

const ThemeModeDropdown = ({ selected, onChange, isDarkMode }) => {
    const containerClasses = isDarkMode
        ? "bg-gray-900 border border-gray-700"
        : "bg-gray-100 border border-gray-300";

    const buttonClasses = isDarkMode
        ? "p-2 rounded cursor-pointer flex items-center space-x-2 text-white hover:bg-gray-700"
        : "p-2 rounded cursor-pointer flex items-center space-x-2 text-gray-900 hover:bg-gray-300";

    return (
        <div
            className={`absolute right-0 mt-2 w-28 rounded shadow-lg z-10 flex flex-col items-center py-2 ${containerClasses}`}
        >
            <button
                onClick={() => onChange("light")}
                className={buttonClasses}
                aria-label="Tema Chiaro"
            >
                <FontAwesomeIcon icon={faSun} />
                <span>Chiaro</span>
            </button>
            <button
                onClick={() => onChange("dark")}
                className={buttonClasses}
                aria-label="Tema Scuro"
            >
                <FontAwesomeIcon icon={faMoon} />
                <span>Scuro</span>
            </button>
            <button
                onClick={() => onChange("system")}
                className={buttonClasses}
                aria-label="Tema Sistema"
            >
                <FontAwesomeIcon icon={faGear} />
                <span>Sistema</span>
            </button>
        </div>
    );
};

export default ThemeModeDropdown;
