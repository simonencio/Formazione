import { useNavigate } from "react-router-dom";

const Logo = ({ src, contentTopRef = null, className = "", onClick = null }) => {
    const navigate = useNavigate();

    const logoClassName = "w-[130px] lg:w-[180px] h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 ";

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        } else {
            e.preventDefault(); // evita che il link faccia reload della pagina
            navigate("/home");
        }
    };

    const image = (
        <img
            src={src}
            alt="Logo"
            className={`${logoClassName} ${className}`}
            onClick={handleClick}
        />
    );

    return (
        <div className="flex-1 flex items-center justify-center">
            {contentTopRef ? (
                <a href="/home" onClick={handleClick}>
                    {image}
                </a>
            ) : (
                image
            )}
        </div>
    );
};

export default Logo;
