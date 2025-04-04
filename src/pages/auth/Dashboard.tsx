import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                console.log('Usuario no autorizado');
                navigate('/login');
                return;
            }

            setUser(currentUser);

            if (!currentUser.email) {
                console.error('El usuario no tiene email');
                return;
            }

            try {
                const userDocRef = doc(db, 'users', currentUser.email);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userDocData = userDocSnap.data();

                    // Si no tiene UUID, lo agregamos
                    if (!userDocData.uuid) {
                        await setDoc(
                            userDocRef,
                            { uuid: currentUser.uid },
                            { merge: true }
                        );
                        console.log('✅ UUID actualizado en Firestore');
                    }

                    // Obtenemos el documento actualizado
                    const updatedDocSnap = await getDoc(userDocRef);
                    setUserData(updatedDocSnap.data());
                } else {
                    console.warn('⚠️ El documento del usuario no existe');
                }
            } catch (error) {
                console.error(
                    'Error al obtener o actualizar el documento del usuario:',
                    error
                );
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
                <>
                    <p className="mb-2">
                        Bienvenido, {user.displayName || user.email}
                    </p>
                    {userData && (
                        <div className="space-y-2 text-sm text-gray-700">
                            <p>
                                <strong>Nombre:</strong> {userData.firstname}
                            </p>
                            <p>
                                <strong>Apellido:</strong> {userData.lastname}
                            </p>
                            <p>
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <p>
                                <strong>DNI:</strong> {userData.dni}
                            </p>
                            <p>
                                <strong>Perfil:</strong> {userData.profile}
                            </p>
                            <p>
                                <strong>UUID:</strong> {userData.uuid}
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <p className="mb-4">No tienes acceso a esta sección</p>
            )}
            <button
                onClick={logout}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition mt-4"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default Dashboard;
