import Card from '@/components/Card';
import { db } from '@/firebase';
import { label } from '@/labels/labels';
import { News } from '@/types/News';
import { getImagePath } from '@/utils/images.utils';
import { convertDate } from '@/utils/utils';
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';

const Noticias: React.FC = () => {
    const [selected, setSelected] = useState<News | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<News[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchContent = async () => {
            try {
                const q = query(
                    collection(db, 'news'),
                    where('isactive', '==', true),
                    limit(3),
                    orderBy('date', 'desc')
                );

                const snapshot = await getDocs(q);

                const data = await Promise.all(
                    snapshot.docs.map(async (docSnap) => {
                        let newsData = docSnap.data();
                        return {
                            ...newsData,
                            id: docSnap.id,
                        };
                    })
                );

                setData(data as News[]);
            } catch (err) {
                console.error(err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

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
            {!hasError && (
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {label.home.news.title}
                    </h2>

                    {!isLoading && data ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((noticia) => (
                                <div
                                    key={noticia.id}
                                    onClick={() => setSelected(noticia)}
                                    className="cursor-pointer"
                                >
                                    <Card
                                        title={noticia.headline}
                                        description={noticia.lead}
                                        date={noticia.date}
                                        image={noticia.image}
                                        type="news"
                                        hasTranslate={true}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Loading isDot={true} color="bg-[#bebebe]" />
                    )}

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
                                        src={getImagePath(
                                            selected.image,
                                            'news'
                                        )}
                                        alt={selected.headline}
                                        className="w-full h-56 object-cover rounded-lg mb-4"
                                    />
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {convertDate(selected.date)}
                                    </p>
                                    <h3 className="text-2xl font-bold text-primary mb-2">
                                        {selected.headline}
                                    </h3>
                                    <p className="text-gray-700 mb-6 text-sm italic">
                                        {selected.lead}
                                    </p>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: selected.htmlbody,
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
            )}
        </>
    );
};

export default Noticias;
