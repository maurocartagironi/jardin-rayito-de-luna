import { FC } from 'react';

const Contactanos: FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Contáctanos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                        Información de Contacto
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="contact-icon">
                                <span className="text-xl">📍</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-primary">
                                    Dirección
                                </h4>
                                <p className="text-gray-600">
                                    Av. Principal 123, Ciudad
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="contact-icon">
                                <span className="text-xl">📞</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-primary">
                                    Teléfono
                                </h4>
                                <p className="text-gray-600">+1 234 567 890</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="contact-icon">
                                <span className="text-xl">✉️</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-primary">
                                    Email
                                </h4>
                                <p className="text-gray-600">
                                    info@mirayitodeluna.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                        className="w-full h-[400px] object-cover"
                        alt="Nuestras instalaciones"
                        src="https://images.unsplash.com/photo-1578593139862-d9b9d9693d57"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contactanos;
