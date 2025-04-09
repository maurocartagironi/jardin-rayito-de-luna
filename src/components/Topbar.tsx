import { FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { auth } from '@/firebase';
import { useContent } from '@/context/ContentContext';
import { getImagePath } from '@/utils/images.utils';
import { useRouter } from '@/context/RouterContext';

const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'sobrenosotros', label: 'Quienes somos' },
    { id: 'instalaciones', label: 'Instalaciones' },
    { id: 'inscripcion', label: 'Inscripción' },
    { id: 'galeria', label: 'Galería' },
];

const Topbar: FC = () => {
    const { content } = useContent();
    const { routers } = useRouter();
    const menuLogin = routers.filter((item) => item.url === '/login')[0];
    const menuRegister = routers.filter((item) => item.url === '/register')[0];
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const getPath = (id: string) => (id === 'home' ? '/' : `/${id}`);

    const hasConfigLogin = import.meta.env.VITE_ENABLE_LOGIN_USER === 'true';
    const socialmedias = content.filter((item) => item.type === 'socialmedias');
    const menues = routers.filter((item) => item.showbar);

    if (!hasConfigLogin && user) {
        auth.signOut();
    }

    const handleLogout = async () => {
        await auth.signOut();
        navigate(menuLogin.url);
    };

    return (
        <nav className="bg-white z-10 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center text-sm text-muted-foreground font-[SalesforceSans]">
                {/* Redes sociales */}
                <div className="flex gap-3 items-center">
                    {socialmedias.map((item) => (
                        <a
                            key={item.title}
                            href={item.button?.link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={getImagePath(
                                    item.image.replace('.svg', 'top.svg')
                                )}
                                alt={item.title}
                                className="w-4 h-4 hover:opacity-80"
                            />
                        </a>
                    ))}
                </div>

                {/* Menú desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    {menues.map((menu: Router) => {
                        const isActive = location.pathname === menu.url;

                        return (
                            <Link
                                key={menu.index}
                                to={menu.url}
                                className={`text-sm ${
                                    isActive
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                {menu.name}
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
                                    onClick={() => navigate(menuLogin?.url)}
                                    className="text-primary underline hover:opacity-80"
                                >
                                    {menuLogin?.name}
                                </button>
                                <button
                                    onClick={() => navigate(menuRegister?.url)}
                                    className="text-primary underline hover:opacity-80"
                                >
                                    {menuRegister?.name}
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
