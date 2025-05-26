// === GridLayout.jsx ===
export const GridLayout = ({ children }) => (
    <div className={`w-full grid grid-cols-12 gap-4 px-4 min-h-screen`}>
        {children}
    </div>
);

// === Liste.jsx ===
export const Liste = ({ children }) => (
    <ul className={`list-none ml-4`}>{children}</ul>
);


// === Titoli.jsx ===
export const Titoli = ({ children }) => (
    <h3 className={`text-lg font-semibold text-start`}>{children}</h3>
);

