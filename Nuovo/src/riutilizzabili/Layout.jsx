// === GridLayout.jsx ===
export const GridLayout = ({ children, className = "" }) => (
    <div className={`w-full grid grid-cols-12 gap-4 px-4 min-h-screen ${className}`}>
        {children}
    </div>
);

// === Liste.jsx ===
export const Liste = ({ children, className = "" }) => (
    <ul className={`list-none ${className}`}>{children}</ul>
);


// === Titoli.jsx ===
export const Titoli = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

