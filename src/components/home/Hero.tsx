import { useEffect, useState, useRef } from 'react';
import { Button } from '@components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const heroData = [
    {
        title: 'Donde cada día florece una nueva aventura',
        description:
            'Un espacio lleno de amor, juego y aprendizaje para que tu hijo crezca feliz.',
        image: '/images/hero1.jpg',
        button: {
            text: 'Conocenos',
            position: 'center',
            link: '#',
        },
    },
    {
        title: 'Jugamos, exploramos y aprendemos juntos',
        description:
            'Actividades diseñadas para estimular la creatividad y el desarrollo emocional.',
        image: '/images/hero2.jpg',
        button: null,
    },
    {
        title: 'Tu hijo en las mejores manos',
        description:
            'Docentes comprometidas, espacios seguros y un entorno de contención y amor.',
        image: '/images/hero3.jpg',
        button: {
            text: 'Inscribite ahora',
            position: 'bottom',
            link: '/inscripcion',
        },
    },
];

const data = heroData;

export const Hero: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const slide = data[index];

    const setNewIndex = (newIndex: number) => {
        setPrevIndex(index);
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    };

    const startAutoplay = () => {
        intervalRef.current = setInterval(() => {
            setNewIndex((prevIndex + 1) % data.length);
        }, 5000);
    };

    useEffect(() => {
        startAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleSwipe = (offsetX: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (offsetX > 50) {
            setNewIndex(index === 0 ? data.length - 1 : index - 1);
        } else if (offsetX < -50) {
            setNewIndex((index + 1) % data.length);
        }

        startAutoplay();
    };

    return (
        <section
            className="h-[400px] md:min-h-[50vh] flex items-center justify-center bg-muted relative overflow-hidden"
            style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={slide.title}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => handleSwipe(info.offset.x)}
                    className="relative z-10 text-center text-white px-6 pt-24 max-w-2xl pb-20"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 rainbow-text">
                        {slide.title}
                    </h1>
                    <p className="text-lg mb-6">{slide.description}</p>
                    {slide.button && (
                        <div
                            className={`mt-4 ${
                                slide.button.position === 'bottom'
                                    ? 'mt-10'
                                    : ''
                            }`}
                        >
                            <Button
                                variant="third"
                                className="text-lg px-6 py-3 rounded-xl"
                                asChild
                            >
                                <a href={slide.button.link}>
                                    {slide.button.text}
                                </a>
                            </Button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Dots de navegación */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {data.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (intervalRef.current)
                                clearInterval(intervalRef.current);
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
        </section>
    );
};
