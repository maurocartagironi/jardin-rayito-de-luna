import { FC, useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import { AnimatePresence, motion } from 'framer-motion';

const Noticias: FC = () => {
    const data = [
        {
            title: 'Huerto escolar en Primavera Huerto escolar en Primavera Huerto escolar en Primavera Huerto escolar en Primavera',
            description:
                'Los niños aprenden sobre el cuidado de las plantas en nuestro huerto escolar. Los niños aprenden sobre el cuidado de las plantas en nuestro huerto escolar. Los niños aprenden sobre el cuidado de las plantas en nuestro huerto escolar. Los niños aprenden sobre el cuidado de las plantas en nuestro huerto escolar.',
            extended:
                '<p>Además de sembrar y regar, los <b>niños</b> aprendieron sobre el <strong>reciclaje de residuos orgánicos</strong> y participaron de la creación de una <em>compostera</em>. ¡Una experiencia completa!</p><br /><p>Durante toda la semana, el jardín se transformó en un espacio de aprendizaje al aire libre. Las maestras guiaron a los niños en la <strong>preparación de la tierra</strong>, el uso de herramientas seguras y la elección de semillas según la estación. Cada niño pudo <strong>plantar su propia maceta personalizada</strong> y observar el crecimiento día a día.</p><p>En paralelo, se desarrolló una charla sobre el <strong>cuidado del medio ambiente</strong>, enfocada en enseñar la diferencia entre residuos orgánicos e inorgánicos. A través de juegos y cuentos, los niños comprendieron la importancia de separar correctamente los desperdicios y <em>reducir el uso de plásticos</em>.</p><p>El momento más emocionante fue la <strong>construcción colaborativa de una compostera</strong> en el patio del jardín. Con materiales reciclados, los niños ayudaron a armar el espacio, aprendieron qué elementos se pueden compostar y cómo este proceso ayuda a las plantas a crecer más sanas.</p><p>Las familias también participaron trayendo elementos de sus casas: <em>cáscaras de frutas, servilletas usadas y restos de café</em>, lo que fortaleció el vínculo entre escuela y hogar en torno a una causa común.</p><p>Para cerrar la semana, se realizó una <strong>“Feria Verde”</strong> en la que se expusieron las macetas, se compartieron recetas con productos naturales y se entregaron folletos con ideas para continuar compostando en casa.</p><p>Esta experiencia no solo promovió <em>valores ecológicos</em>, sino también <strong>trabajo en equipo, paciencia y responsabilidad</strong>. ¡Fue una jornada inolvidable para los más chicos y un paso más hacia un futuro más sustentable!</p>',
            date: '03/04/2025',
            image: 'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab',
            author: 'Maestra Alejandra',
        },
        {
            title: 'Día de la Familia',
            description:
                'Próximo evento familiar con juegos, música y actividades para todos.',
            extended:
                'Invitamos a todas las familias a compartir un día especial en nuestro jardín. Habrá juegos, feria de libros y actividades para fortalecer el vínculo escuela-familia.',
            date: '01/03/2025',
            image: 'https://images.unsplash.com/photo-1526634332515-d56c5fd16991',
            author: 'Maestra Viviana',
        },
        {
            title: 'Nuevo Taller de Arte',
            description:
                'Inauguramos nuestro nuevo taller de arte con materiales ecológicos.',
            extended:
                'Los niños trabajarán con elementos reciclados, témperas naturales y distintas técnicas plásticas para desarrollar su creatividad libremente.',
            date: '15/03/2025',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
            author: 'Maestra Soledad',
        },
    ];

    const [selected, setSelected] = useState<(typeof data)[0] | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Cierre al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setSelected(null);
            }
        };
        if (selected) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('modal-open');
        };
    }, [selected]);

    const formatDate = (fechaStr: string): string => {
        const [dia, mes, anio] = fechaStr.split('/').map(Number);
        const fecha = new Date(anio, mes - 1, dia);

        return new Intl.DateTimeFormat('es-AR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
        }).format(fecha);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Últimas noticias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((noticia, index) => (
                    <div
                        key={index}
                        onClick={() => setSelected(noticia)}
                        className="cursor-pointer"
                    >
                        <Card
                            title={noticia.title}
                            description={noticia.description}
                            date={formatDate(noticia.date)}
                            image={noticia.image}
                            hasTranslate={false}
                        />
                    </div>
                ))}
            </div>

            {/* Modal animado */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            key="modal"
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white max-h-[90vh] overflow-y-auto w-full max-w-5xl rounded-xl shadow-xl p-6 relative modal-scroll"
                        >
                            <div className="py-4">
                                <button
                                    onClick={() => setSelected(null)}
                                    className="pr-2 absolute top-3 right-4 text-gray-500 hover:text-black text-4xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <p className="text-sm text-muted-foreground mb-2">
                                {formatDate(selected.date)}
                            </p>
                            <h3 className="text-2xl font-bold text-primary mb-2">
                                {selected.title}
                            </h3>
                            <p className="text-gray-700 mb-6 text-sm italic">
                                {selected.description}
                            </p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: selected.extended,
                                }}
                                className="text-gray-600 leading-relaxed whitespace-pre-line"
                            ></div>
                            <p className="text-gray-500 mt-4 text-sm italic text-right">
                                {selected.author}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Noticias;
