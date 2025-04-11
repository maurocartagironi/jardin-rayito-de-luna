import { FC } from 'react';
import Card from '../components/Card';
import { label } from '@/labels/labels';
import { useGallery } from '@/context/GalleryContext';
import { getImagePath } from '@/utils/images.utils';

const Instalaciones: FC = () => {
    const { gallery } = useGallery();
    const installData = gallery
        .filter((g) => g.section === 'installations')
        .sort((a, b) => a.index - b.index);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                {label.installations.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {installData.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={getImagePath(item.image)}
                        type="gallery"
                    />
                ))}
            </div>
        </div>
    );
};

export default Instalaciones;
