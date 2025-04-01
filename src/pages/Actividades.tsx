import { FC } from 'react';
import Card from '../components/Card';

interface ActivityItem {
    icon: string;
    title: string;
    desc: string;
}

const Actividades: FC = () => {
    const activityMap: ActivityItem[] = [
        {
            icon: '🎨',
            title: 'Arte y Creatividad',
            desc: 'Talleres de pintura, manualidades y expresión artística para desarrollar la creatividad.',
        },
        {
            icon: '🎵',
            title: 'Música y Movimiento',
            desc: 'Clases de música, baile y expresión corporal para estimular el desarrollo motriz.',
        },
        {
            icon: '📚',
            title: 'Lectura Temprana',
            desc: 'Cuentacuentos y actividades de pre-lectura para fomentar el amor por los libros.',
        },
        {
            icon: '🌱',
            title: 'Huerto Escolar',
            desc: 'Actividades de jardinería y cuidado del medio ambiente.',
        },
        {
            icon: '🏃',
            title: 'Deportes',
            desc: 'Juegos y actividades físicas adaptadas para desarrollar la coordinación.',
        },
        {
            icon: '🧩',
            title: 'Juegos Didácticos',
            desc: 'Actividades lúdicas para el desarrollo del pensamiento lógico.',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                Nuestras Actividades
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {activityMap.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.desc}
                        image={undefined} // sin imagen
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Actividades;
