import React from 'react';

/**
 * Página de Inscripción
 *
 * Muestra los requisitos, horarios disponibles y pasos para la inscripción
 *
 * @returns {JSX.Element} Componente de la página de Inscripción
 */
const Inscripcion: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Proceso de Inscripción
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md transition-transform hover:-translate-y-1 bg-white overflow-hidden text-center p-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            Requisitos
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                            {[
                                'Copia del DNI del niño/a',
                                'Copia del DNI de los padres',
                                'Cartilla de vacunación',
                                'Certificado médico reciente',
                                '2 fotos tamaño carnet',
                            ].map((req, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        ✓
                                    </div>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            Horarios Disponibles
                        </h3>
                        <div className="space-y-3 text-gray-600">
                            <p className="flex items-center gap-2">
                                <span className="text-primary">🌅</span>
                                Turno Mañana: 8:00 - 12:00
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-primary">☀️</span>
                                Turno Tarde: 14:00 - 18:00
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-primary">📚</span>
                                Jornada Completa: 8:00 - 18:00
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                        Pasos para la Inscripción
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                icon: '1️⃣',
                                title: 'Contacto Inicial',
                                desc: 'Agenda una visita para conocer nuestras instalaciones',
                            },
                            {
                                icon: '2️⃣',
                                title: 'Entrevista',
                                desc: 'Reunión con nuestro equipo pedagógico',
                            },
                            {
                                icon: '3️⃣',
                                title: 'Documentación',
                                desc: 'Presentación de los requisitos solicitados',
                            },
                            {
                                icon: '4️⃣',
                                title: 'Matrícula',
                                desc: 'Formalización de la inscripción y pago de matrícula',
                            },
                        ].map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="feature-icon shrink-0">
                                    <span className="text-xl">{step.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-primary">
                                        {step.title}
                                    </h4>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        {/* Este espacio puede ser un botón en el futuro */}
                        Solicitar Información
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inscripcion;
