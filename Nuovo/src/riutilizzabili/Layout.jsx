// === GridLayout.jsx ===
export const GridLayout = ({ children }) => (
    <div className={`w-full grid grid-cols-12 gap-4 px-1 min-h-screen shadow-[inset_0_-8px_8px_-8px_rgba(0,0,0,0.3)]`}>
        {children}
    </div>
);

// === Liste.jsx ===
export const Liste = ({ children }) => (
    <ul className={`list-none ml-2`}>{children}</ul>
);


// === Titoli.jsx ===
export const Titoli = ({ children }) => (
    <h3 className={`text-lg font-semibold text-start`}>{children}</h3>
);

