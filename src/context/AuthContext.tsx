import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, getRedirectResult, User } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) setUser(result.user);
            } catch (err) {
                console.error('Redirect error', err);
            }

            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser);
                setLoading(false);
            });

            return unsubscribe;
        };

        const unsubPromise = initAuth();
        return () => {
            unsubPromise.then((unsub) => unsub && unsub());
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
