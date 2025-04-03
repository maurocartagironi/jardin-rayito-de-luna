import { Button } from '@/components/Button';
import React from 'react';

/**
 * Página de Inscripción
 *
 * Muestra los requisitos, horarios disponibles y pasos para la inscripción
 *
 * @returns {JSX.Element} Componente de la página de Inscripción
 */
const Inscripcion: React.FC = () => {
    const data = {
        phoneNumber: '5491123456789',
        message: 'Hola, me gustaría obtener más información sobre el jardín.',
    };

    const encodedMessage = encodeURIComponent(data.message);
    const whatsappLink = `https://wa.me/${data.phoneNumber}?text=${encodedMessage}`;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Proceso de Inscripción
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
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
                    <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            Horarios disponibles
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

                <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                        Pasos para la inscripción
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

                    <div className="mt-8 flex justify-center">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white bg-primary hover:bg-primary/80 font-medium text-lg px-4 py-2 rounded-xl transition border-white md:border-primary hover:border-white"
                        >
                            Solicitar información
                        </a>
                    </div>
                    <div className="text-primary/90 mt-8 flex justify-left">
                        Horario de atención: Lunes a viernes de 9:00 a 18:00
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inscripcion;
