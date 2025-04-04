import { FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { auth } from '@/firebase';

const socialLinks = [
    {
        href: 'https://facebook.com',
        alt: 'Facebook',
        src: 'https://www.svgrepo.com/show/500854/facebook.svg',
    },
    {
        href: 'https://instagram.com',
        alt: 'Instagram',
        src: 'https://www.svgrepo.com/show/506668/instagram.svg',
    },
    {
        href: 'https://tiktok.com',
        alt: 'TikTok',
        src: 'https://www.svgrepo.com/show/473806/tiktok.svg',
    },
];

const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'sobrenosotros', label: 'Quienes somos' },
    { id: 'instalaciones', label: 'Instalaciones' },
    { id: 'inscripcion', label: 'Inscripción' },
    { id: 'galeria', label: 'Galería' },
];

const Topbar: FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const getPath = (id: string) => (id === 'home' ? '/' : `/${id}`);

    const hasConfigLogin = import.meta.env.VITE_ENABLE_LOGIN_USER === 'true';

    if (!hasConfigLogin && user) {
        auth.signOut();
    }

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    return (
        <nav className="bg-white z-10 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center text-sm text-muted-foreground font-[SalesforceSans]">
                {/* Redes sociales */}
                <div className="flex gap-3 items-center">
                    {socialLinks.map(({ href, alt, src }) => (
                        <a
                            key={alt}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="w-4 h-4 hover:opacity-80"
                            />
                        </a>
                    ))}
                </div>

                {/* Menú desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    {menuItems.map(({ id, label }) => {
                        const path = getPath(id);
                        const isActive = location.pathname === path;

                        return (
                            <Link
                                key={id}
                                to={path}
                                className={`text-sm ${
                                    isActive
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Usuario o botones de login */}
                {hasConfigLogin && (
                    <div className="flex flex-col items-end text-xs gap-1">
                        {user ? (
                            <div
                                className="flex gap-4 cursor-pointer"
                                onClick={() => navigate('/dashboard')}
                            >
                                <div className="flex gap-2 items-center">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Avatar"
                                            className="w-5 h-5 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs text-gray-600 font-bold">
                                            {user.displayName
                                                ? user.displayName[0].toUpperCase()
                                                : user.email?.[0].toUpperCase()}
                                        </div>
                                    )}
                                    <span className="truncate max-w-[150px]">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-primary underline hover:opacity-80"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
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
                )}
            </div>
        </nav>
    );
};

export default Topbar;
