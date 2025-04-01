import React from 'react';

const SobreNosotros: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Sobre Nosotros
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="shadow-lg rounded-lg overflow-hidden">
                    <img
                        className="w-full h-[400px] object-cover"
                        alt="Nuestro equipo"
                        src="https://images.unsplash.com/photo-1652407173066-6bca9753ffea"
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                        Nuestra Historia
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                        Desde 2010, Mi Rayito de Luna ha sido un segundo hogar
                        para cientos de niños. Nuestro compromiso es
                        proporcionar un ambiente seguro, estimulante y lleno de
                        amor donde cada niño pueda crecer y desarrollarse.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="feature-icon">
                                <span className="text-xl">👨‍🏫</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-primary">
                                    Equipo Profesional
                                </h4>
                                <p className="text-gray-600">
                                    Educadores altamente calificados
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="feature-icon">
                                <span className="text-xl">🎯</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-primary">
                                    Metodología Única
                                </h4>
                                <p className="text-gray-600">
                                    Aprendizaje basado en el juego
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreNosotros;
