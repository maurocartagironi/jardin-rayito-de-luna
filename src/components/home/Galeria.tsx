import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const Galeria: React.FC = () => {
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

    const data = [
        'https://images.unsplash.com/photo-1574472153340-accbe65ce3f7',
        'https://images.unsplash.com/photo-1608633650126-999ff4c747e0',
        'https://images.unsplash.com/photo-1601339434203-130259102db6',
        'https://images.unsplash.com/photo-1567057419565-4349c49d8a04',
        'https://images.unsplash.com/photo-1604881991720-f91add269bed',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        'https://images.unsplash.com/photo-1604881991720-f91add269bed',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    ];

    return (
        <section className="bg-muted">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Un vistazo a nuestro día a día
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-muted h-32 rounded-xl shadow flex items-center justify-center text-muted-foreground overflow-hidden"
                        >
                            <img
                                onClick={() => setSelected(item)}
                                src={item}
                                alt={`Imagen ${index + 1}`}
                                className="h-full w-full object-cover cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>

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
                            className="overflow-y-none bg-white max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative modal-scroll"
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
                                src={selected}
                                alt=""
                                className="max-h-[75vh]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
