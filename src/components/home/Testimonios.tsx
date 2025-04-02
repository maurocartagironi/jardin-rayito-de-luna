export const Testimonios: React.FC = () => {
    return (
        <section className="bg-muted py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Lo que dicen las familias
                </h2>
                <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow">
                            <p className="italic">
                                “Mi hijo ama ir al jardín, todos los días vuelve
                                feliz.”
                            </p>
                            <p className="text-sm text-right mt-2">
                                – Familia Pérez
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
