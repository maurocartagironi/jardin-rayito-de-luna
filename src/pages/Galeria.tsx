import { FC } from 'react';

const Galeria: FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Nuestra Galería
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover"
                        alt="Actividades artísticas"
                        src="https://images.unsplash.com/photo-1574472153340-accbe65ce3f7"
                    />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover"
                        alt="Juegos educativos"
                        src="https://images.unsplash.com/photo-1608633650126-999ff4c747e0"
                    />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover"
                        alt="Tiempo de lectura"
                        src="https://images.unsplash.com/photo-1601339434203-130259102db6"
                    />
                </div>
            </div>
        </div>
    );
};

export default Galeria;
