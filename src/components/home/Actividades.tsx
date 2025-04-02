export const Actividades: React.FC = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold text-center mb-8">
                Actividades destacadas
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    'Música',
                    'Inglés',
                    'Taller sensorial',
                    'Juegos al aire libre',
                ].map((actividad, i) => (
                    <div
                        key={i}
                        className="bg-muted p-4 rounded-xl text-center"
                    >
                        <p className="text-lg font-medium">{actividad}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
