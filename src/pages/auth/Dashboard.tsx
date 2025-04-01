import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate('/login'); // redirige si no hay sesión
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const logout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Panel privado</h1>
            {user ? (
                <p className="mb-4">
                    Bienvenido, {user.displayName || user.email}
                </p>
            ) : (
                <p className="mb-4">No tienes acceso a esta sección</p>
            )}
            <button
                onClick={logout}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default Dashboard;
