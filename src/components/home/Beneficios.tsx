export const Beneficios: React.FC = () => {
    return (
        <section className="bg-muted py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-10">
                    Nuestros pilares
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        'Educación emocional',
                        'Alimentación saludable',
                        'Instalaciones seguras',
                        'Estimulación temprana',
                        'Profes de confianza',
                        'Comunicación con familias',
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-2xl shadow text-center"
                        >
                            <div className="feature-icon mb-3">{index + 1}</div>
                            <p className="text-lg font-medium">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
