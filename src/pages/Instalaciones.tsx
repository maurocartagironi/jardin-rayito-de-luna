import { FC } from 'react';
import Card from '../components/Card';

const Instalaciones: FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                Nuestras Instalaciones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                <Card
                    title="Aulas Temáticas"
                    description="Espacios diseñados específicamente para cada grupo de edad, equipados con materiales educativos de alta calidad."
                    image="https://images.unsplash.com/photo-1567057419565-4349c49d8a04"
                />
                <Card
                    title="Área de Juegos"
                    description="Patio de juegos seguro y estimulante con equipamiento moderno y áreas verdes."
                    image="https://images.unsplash.com/photo-1597016578375-23b708267e34"
                />
                <Card
                    title="Comedor"
                    description="Espacio limpio y acogedor donde los niños disfrutan de comidas nutritivas y balanceadas."
                    image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
                />
                <Card
                    title="Sala Multisensorial"
                    description="Ambiente especialmente diseñado para estimular los sentidos y la exploración."
                    image="https://images.unsplash.com/photo-1604881991720-f91add269bed"
                />
            </div>
        </div>
    );
};

export default Instalaciones;
