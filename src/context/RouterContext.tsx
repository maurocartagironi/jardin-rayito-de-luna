import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

interface RouterContextProps {
    routers: Router[];
    isLoading: boolean;
    hasError: boolean;
}

const RouterContext = createContext<RouterContextProps>({
    routers: [],
    isLoading: true,
    hasError: false,
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [routers, setRouters] = useState<Router[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const q = query(
                    collection(db, 'router'),
                    where('isactive', '==', true)
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    index: doc.data().index ?? 0,
                })) as Router[];
                setRouters(data.sort((a, b) => a.index - b.index));
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
        <RouterContext.Provider value={{ routers, isLoading, hasError }}>
            {children}
        </RouterContext.Provider>
    );
};
