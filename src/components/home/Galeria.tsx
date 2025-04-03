export const Galeria: React.FC = () => {
    const data = [
        'https://images.unsplash.com/photo-1574472153340-accbe65ce3f7',
        'https://images.unsplash.com/photo-1608633650126-999ff4c747e0',
        'https://images.unsplash.com/photo-1601339434203-130259102db6',
        'https://images.unsplash.com/photo-1567057419565-4349c49d8a04',
        'https://images.unsplash.com/photo-1597016578375-23b708267e34',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        'https://images.unsplash.com/photo-1604881991720-f91add269bed',
        'https://images.unsplash.com/photo-1599928020359-9e5e52da2cbe',
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
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
                            src={item}
                            alt={`Imagen ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
