import { useGallery } from '@/context/GalleryContext';
import { getImagePath } from '@/utils/images.utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import { label } from '@/labels/labels';

export const Galeria: React.FC = () => {
    const IMAGE_LIMIT = 4;

    const { gallery, isLoading, hasError } = useGallery();
    const info: Gallery[] = gallery
        .filter((item) => item.section === 'home')
        .slice(0, IMAGE_LIMIT);
    const [selected, setSelected] = useState<Gallery | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

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

    return (
        <>
            {!hasError && info && (
                <section className="bg-muted">
                    <div className="max-w-6xl mx-auto px-4 py-16">
                        <h2 className="text-3xl font-semibold text-center mb-8">
                            {label.home.gallery.title}
                        </h2>
                        {!isLoading && info ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {info.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-muted h-32 rounded-xl shadow-md flex items-center justify-center text-muted-foreground overflow-hidden"
                                    >
                                        <img
                                            onClick={() => setSelected(item)}
                                            src={getImagePath(
                                                item.image,
                                                'gallery'
                                            )}
                                            alt={`Imagen ${index + 1}`}
                                            className="h-full w-full object-cover cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Loading isDot={true} color="bg-[#bebebe]" />
                        )}
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
                                        src={selected.image}
                                        alt=""
                                        className="max-h-[75vh]"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            )}
        </>
    );
};
