export const Galeria: React.FC = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold text-center mb-8">
                Un vistazo a nuestro día a día
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div
                        key={n}
                        className="bg-muted h-32 rounded-xl shadow flex items-center justify-center text-muted-foreground"
                    >
                        Foto {n}
                    </div>
                ))}
            </div>
        </section>
    );
};
