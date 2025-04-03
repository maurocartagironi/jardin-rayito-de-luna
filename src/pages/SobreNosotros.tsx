import React from 'react';

const SobreNosotros: React.FC = () => {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                    Sobre nosotros
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <img
                            className="w-full h-[200px] object-cover"
                            alt="Nuestro equipo"
                            src="https://images.unsplash.com/photo-1652407173066-6bca9753ffea"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            Nuestra historia
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                            En <strong>Mi rayito de Luna</strong> comenzamos
                            este año con un sueño: Acompañar los primeros pasos
                            de cada niño con amor, juego y respeto. Creamos un
                            espacio cálido donde las emociones se abrazan, la
                            curiosidad se despierta y cada día florece una nueva
                            aventura.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center mt-10">
                    {/* Columna izquierda: Info de contacto */}
                    <div className="space-y-6 text-md text-left">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            Donde ubicarnos
                        </h3>
                        <div className="pl-6">
                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    📍 Dirección
                                </h4>
                                <p>
                                    Av. Siempreviva 123
                                    <br />
                                    Ciudad Jardín, Buenos Aires
                                </p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    📞 Teléfono
                                </h4>
                                <p>(011) 1234-5678</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    ✉️ Email
                                </h4>
                                <p>contacto@mirayitodeluna.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha: Mapa */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.415982933445!2d-58.55897892426248!3d-34.64214426007674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc7a173b4b6e9%3A0x93e1b46c389e0f36!2sAv.%20Siempreviva%20123%2C%20Ciudad%20Jard%C3%ADn!5e0!3m2!1ses!2sar!4v1711999531555!5m2!1ses!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SobreNosotros;
