import { handleLogoClick } from "../utils/logo";


const Logo = ({ src, contentTopRef = null, className = "", onClick = null }) => {
    const logoClassName = "w-[150px] lg:w-[200px] h-auto cursor-pointer"; // Base dimensione logo

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else {
            handleLogoClick(e, null, contentTopRef);
        }
    };

    const image = (
        <img
            src={src}
            alt="Logo"
            className={`${logoClassName} ${className}`} // Uniamo la classe base con quella passata come prop
            onClick={handleClick}
        />
    );

    return (
        <div className="flex-1 flex items-center justify-center">
            {contentTopRef ? (
                <a href="/" onClick={handleClick}>
                    {image}
                </a>
            ) : (
                image
            )}
        </div>
    );
};

export default Logo;
