import Loading from '@/components/Loading';
import { useGallery } from '@/context/GalleryContext';
import { label } from '@/labels/labels';
import { getImagePath } from '@/utils/images.utils';
import { useState } from 'react';

const Galeria = () => {
    const { gallery } = useGallery();
    const [selectedImage, setSelectedImage] = useState<Gallery>();

    const publicImages = gallery
        .filter((g) => g.section === 'gallery')
        .sort((a, b) => a.index - b.index);

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                {label.gallery.title}
            </h2>

            {selectedImage ? (
                <div className="space-y-6">
                    <button
                        onClick={() => setSelectedImage(undefined)}
                        className="text-primary hover:text-primary/80"
                    >
                        ← Volver a la galería
                    </button>
                    <img
                        src={getImagePath(selectedImage.image, 'gallery')}
                        alt={selectedImage.title}
                        className="w-full max-h-[600px] object-contain rounded-lg shadow"
                    />
                </div>
            ) : publicImages && publicImages.length > 0 ? (
                <>
                    <div className="mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {publicImages.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedImage(item)}
                                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <img
                                        src={getImagePath(
                                            item.image,
                                            'gallery'
                                        )}
                                        className="w-full h-64 object-cover"
                                        alt={item.title}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <Loading size={10} borderSize={2} />
            )}
        </section>
    );
};

export default Galeria;
