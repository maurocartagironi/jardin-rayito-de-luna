import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Loading';
import { useContent } from '@/context/ContentContext';

export const Hero: React.FC = () => {
    const { content, isLoading, hasError } = useContent();
    const slides = content.filter((item) => item.type === 'header');

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const currentSlide = slides[index];

    const setNewIndex = (newIndex: number) => {
        setDirection(1);
        setIndex(newIndex);
    };

    const startAutoplay = () => {
        stopAutoplay();
        intervalRef.current = setInterval(() => {
            setIndex((prev) => {
                setDirection(1);
                return (prev + 1) % slides.length;
            });
        }, 5000);
    };

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (slides.length) startAutoplay();
        return () => stopAutoplay();
    }, [slides]);

    if (isLoading) {
        return (
            <section className="h-[400px] md:min-h-[50vh] flex items-center justify-center bg-muted relative overflow-hidden">
                <Loading size={10} color="white" />
            </section>
        );
    }

    return (
        <section
            className="h-[400px] md:min-h-[50vh] flex items-center justify-center bg-muted relative overflow-hidden"
            style={{
                ...(currentSlide.image
                    ? { backgroundImage: `url(${currentSlide.image})` }
                    : {
                          backgroundImage:
                              'linear-gradient(to right top, rgb(170, 0, 255), rgb(0, 255, 123))',
                      }),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
            {!hasError && (
                <>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentSlide.title}
                            custom={direction}
                            initial={{
                                opacity: 0,
                                x: direction > 0 ? 100 : -100,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                                opacity: 0,
                                x: direction > 0 ? -100 : 100,
                            }}
                            transition={{ duration: 0.5 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            className="relative z-10 text-center text-white px-6 pt-24 max-w-2xl pb-20"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 rainbow-text">
                                {currentSlide.title}
                            </h1>
                            <p className="text-lg mb-6">
                                {currentSlide.description}
                            </p>
                            {currentSlide.button && (
                                <div
                                    className={`mt-4 ${
                                        currentSlide.button.position ===
                                        'bottom'
                                            ? 'mt-10'
                                            : ''
                                    }`}
                                >
                                    <Button
                                        variant="default"
                                        className="text-lg px-6 py-3 rounded-xl"
                                        asChild
                                    >
                                        <a href={currentSlide.button.link}>
                                            {currentSlide.button.label}
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    stopAutoplay();
                                    setNewIndex(i);
                                    startAutoplay();
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    i === index
                                        ? 'bg-white'
                                        : 'bg-white/50 hover:bg-white'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};
