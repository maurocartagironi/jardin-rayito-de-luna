import { describe } from 'node:test';
import Card from '../Card';

export const Actividades: React.FC = () => {
    const data = [
        {
            icon: 'https://www.svgrepo.com/show/528428/music-notes.svg',
            title: 'Música',
            description: 'Música para todos los niveles',
        },
        {
            icon: 'https://www.svgrepo.com/show/317471/uk-flag.svg',
            title: 'Inglés',
            description: 'Inglés para todos los niveles',
        },
        {
            icon: 'https://www.svgrepo.com/show/300202/brush-paint.svg',
            title: 'Taller sensorial',
            description: 'Taller sensorial para todos los niveles',
        },
        {
            icon: 'https://www.svgrepo.com/show/243788/slide.svg',
            title: 'Juegos al aire libre',
            description: 'Juegos al aire libre para todos los niveles',
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-semibold text-center mb-8">
                Actividades destacadas
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
                {data.map((actividad, i) => (
                    <Card
                        key={i}
                        title={actividad.title}
                        description={actividad.description}
                        iconUrl={actividad.icon}
                        hasTranslate={false}
                    />
                    /*<div
                        key={i}
                        className="bg-muted p-4 rounded-xl text-center"
                    >
                        <img
                            src={actividad.icon}
                            alt={actividad.title}
                            className="w-12 h-12 mx-auto mb-2"
                        />
                        <p className="text-lg font-medium">{actividad.title}</p>
                    </div>*/
                ))}
            </div>
        </section>
    );
};
