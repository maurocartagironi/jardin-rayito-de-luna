import { useGallery } from '@/context/GalleryContext';
import { label } from '@/labels/labels';
import { getImagePath } from '@/utils/images.utils';
import { formatPhoneNumber } from '@/utils/utils';
import React from 'react';

const SobreNosotros: React.FC = () => {
    const { gallery } = useGallery();
    const imageSrc = gallery.find((g) => g.section === 'ourteam')?.image || '';

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                    {label.aboutus.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <img
                            className="w-full h-[200px] object-cover"
                            alt={label.aboutus.ourteam}
                            src={getImagePath(imageSrc, 'gallery')}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            {label.aboutus.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                            {label.aboutus.description}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center mt-10">
                    <div className="space-y-6 text-md text-left">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            {label.aboutus.location}
                        </h3>
                        <div className="pl-6">
                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    📍 {label.aboutus.address}
                                </h4>
                                <p>{label.company.address}</p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label.company.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                >
                                    <img
                                        src="https://www.google.com/images/branding/product/1x/maps_64dp.png"
                                        alt="Google Maps"
                                        className="w-4 h-4"
                                    />
                                    Ver en Maps
                                </a>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    📞 {label.aboutus.phoneNumber}
                                </h4>
                                <p>
                                    <a
                                        href={`tel:${formatPhoneNumber(label.company.phoneNumber)}`}
                                    >
                                        {formatPhoneNumber(
                                            label.company.phoneNumber
                                        )}
                                    </a>
                                </p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-primary font-semibold mb-1">
                                    ✉️ {label.aboutus.email}
                                </h4>
                                <p>
                                    <a href={`mailto:${label.company.email}`}>
                                        {label.company.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha: Mapa */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow">
                        <iframe
                            src={label.company.googleplaceembed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SobreNosotros;
