import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase';

const Topbar: FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    return (
        <nav className="bg-white z-10">
            <div className="max-w-6xl mx-auto px-4 mx-auto w-full text-muted-foreground text-sm py-2 flex justify-between items-center font-[SalesforceSans]">
                {/* Redes sociales a la izquierda */}
                <div className="flex gap-3 items-center">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://www.svgrepo.com/show/500854/facebook.svg"
                            alt="Facebook"
                            className="w-4 h-4 hover:opacity-80"
                        />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://www.svgrepo.com/show/506668/instagram.svg"
                            alt="Instagram"
                            className="w-4 h-4 hover:opacity-80"
                        />
                    </a>
                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://www.svgrepo.com/show/473806/tiktok.svg"
                            alt="TikTok"
                            className="w-4 h-4 hover:opacity-80"
                        />
                    </a>
                </div>

                {/* Info de usuario o botones a la derecha */}
                <div className="flex flex-col items-end text-xs gap-1">
                    {user ? (
                        <>
                            <span className="truncate max-w-[150px]">
                                Hola, {user.displayName || user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-primary underline hover:opacity-80"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-primary underline hover:opacity-80"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="text-primary underline hover:opacity-80"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
