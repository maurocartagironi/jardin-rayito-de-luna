import Card from '@components/Card';

export const Beneficios: React.FC = () => {
    const data = [
        {
            title: 'Acompañamiento afectivo',
            icon: '❤️',
        },
        {
            title: 'Juego como motor del aprendizaje',
            icon: '🎨',
        },
        {
            title: 'Estimulación temprana integral',
            icon: '🧠',
        },
        {
            title: 'Vínculo cercano con las familias',
            icon: '👩‍🏫',
        },
        {
            title: 'Educación emocional',
            icon: '🧘‍♀️',
        },
        {
            title: 'Hábitos saludables',
            icon: '🍎',
        },
    ];

    return (
        <section className="bg-muted py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-10">
                    Nuestros pilares
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-2xl shadow text-center flex items-center justify-center"
                        >
                            <p className="text-lg font-medium">
                                {item.icon} {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
