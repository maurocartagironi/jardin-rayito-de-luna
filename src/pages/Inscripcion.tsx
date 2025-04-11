import { label } from '@/labels/labels';
import React from 'react';

/**
 * Página de Inscripción
 *
 * Muestra los requisitos, horarios disponibles y pasos para la inscripción
 *
 * @returns {JSX.Element} Componente de la página de Inscripción
 */
const Inscripcion: React.FC = () => {
    const encodedMessage = encodeURIComponent(label.whatsAppMessage);
    const whatsAppLink = `https://wa.me/${label.company.phoneNumber}?text=${encodedMessage}`;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                {label.registration.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            {label.registration.requirements}
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                            {label.registration.requirementList.map(
                                (req, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            ✓
                                        </div>
                                        {req}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">
                            {label.registration.schedule}
                        </h3>
                        <div className="space-y-3 text-gray-600">
                            {label.registration.scheduleList.map(
                                (schedule, index) => (
                                    <p
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary">
                                            {schedule.icon}
                                        </span>
                                        {schedule.label}: {schedule.time}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="cursor-default border-2 border-red-300 rounded-2xl shadow-md bg-white overflow-hidden text-left p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                        {label.registration.stepText}
                    </h3>
                    <div className="space-y-4">
                        {label.registration.steps.map((step, index) => (
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
                            href={whatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white bg-primary hover:bg-primary/80 font-medium text-lg px-4 py-2 rounded-xl transition border-white md:border-primary hover:border-white"
                        >
                            {label.registration.buttonRegistration}
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
