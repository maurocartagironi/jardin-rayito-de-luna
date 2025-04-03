export const Nosotros: React.FC = () => {
    const data = {
        title: '¿Quiénes somos?',
        description:
            'Somos un jardín de infantes que inicia su camino este año, con mucho entusiasmo, amor y compromiso. Acompañamos a los más pequeños en sus primeros pasos con respeto, juegos significativos y muchas ganas de enseñar. Creemos en una educación integral, afectiva y cercana a cada familia.',
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold mb-4">{data.title}</h2>
            <p className="text-muted-foreground text-lg">{data.description}</p>
        </section>
    );
};
