import { FC } from 'react';

const Noticias: FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Últimas Noticias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        alt="Taller de arte"
                        src="https://images.unsplash.com/photo-1599928020359-9e5e52da2cbe"
                    />
                    <div className="p-6">
                        <span className="text-sm text-primary">
                            15 de Marzo, 2025
                        </span>
                        <h3 className="text-xl font-semibold mt-2 mb-3">
                            Nuevo Taller de Arte
                        </h3>
                        <p className="text-gray-600">
                            Inauguramos nuestro nuevo taller de arte con
                            materiales ecológicos para estimular la creatividad.
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        alt="Huerto escolar"
                        src="https://images.unsplash.com/photo-1592503254549-d83d24a4dfab"
                    />
                    <div className="p-6">
                        <span className="text-sm text-primary">
                            10 de Marzo, 2025
                        </span>
                        <h3 className="text-xl font-semibold mt-2 mb-3">
                            Huerto Escolar en Primavera
                        </h3>
                        <p className="text-gray-600">
                            Los niños aprenden sobre el cuidado de las plantas
                            en nuestro huerto escolar.
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                        className="w-full h-48 object-cover"
                        alt="Evento familiar"
                        src="https://images.unsplash.com/photo-1526634332515-d56c5fd16991"
                    />
                    <div className="p-6">
                        <span className="text-sm text-primary">
                            1 de Marzo, 2025
                        </span>
                        <h3 className="text-xl font-semibold mt-2 mb-3">
                            Día de la Familia
                        </h3>
                        <p className="text-gray-600">
                            Próximo evento familiar con juegos, música y
                            actividades para todos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Noticias;
