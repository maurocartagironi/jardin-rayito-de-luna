import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

interface ContentContextProps {
    content: Content[];
    isLoading: boolean;
    hasError: boolean;
}

const ContentContext = createContext<ContentContextProps>({
    content: [],
    isLoading: true,
    hasError: false,
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [content, setContent] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'content'));
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    index: doc.data().index ?? 0,
                })) as Content[];
                setContent(data.sort((a, b) => a.index - b.index));
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
        <ContentContext.Provider value={{ content, isLoading, hasError }}>
            {children}
        </ContentContext.Provider>
    );
};
