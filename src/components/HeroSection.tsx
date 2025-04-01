import FeatureItem from './FeatureItem';

export const HeroSection: React.FC = () => {
    return (
        <div
            className="relative h-[400px] w-full bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1655087751325-1aba19f6dd16')",
            }}
        >
            <div className="absolute inset-0 bg-black/75 z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-white text-center flex flex-col justify-center h-full">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 rainbow-text">
                    Mi Rayito de Luna
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    Bienvenidos a nuestra familia
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    En Mi Rayito de Luna, creemos en nutrir el potencial único
                    de cada niño a través del juego, el aprendizaje y el
                    descubrimiento.
                </p>
                <div className="space-y-4 text-left mx-auto max-w-2xl">
                    <FeatureItem
                        icon="🎨"
                        title="Creatividad sin límites"
                        description="Espacios diseñados para la imaginación"
                    />
                    <FeatureItem
                        icon="🌱"
                        title="Desarrollo integral"
                        description="Educación personalizada y atención dedicada"
                    />
                </div>
            </div>
        </div>
    );
};
