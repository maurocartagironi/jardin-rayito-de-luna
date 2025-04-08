import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

interface GalleryContextProps {
    gallery: Gallery[];
    isLoading: boolean;
    hasError: boolean;
}

const GalleryContext = createContext<GalleryContextProps>({
    gallery: [],
    isLoading: true,
    hasError: false,
});

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [gallery, setGallery] = useState<Gallery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const q = query(
                    collection(db, 'gallery'),
                    where('isactive', '==', true),
                    where('ispublic', '==', true)
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    index: doc.data().index ?? 0,
                })) as Gallery[];
                setGallery(data.sort((a, b) => a.index - b.index));
            } catch (err) {
                console.error(err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

    return (
        <GalleryContext.Provider value={{ gallery, isLoading, hasError }}>
            {children}
        </GalleryContext.Provider>
    );
};
