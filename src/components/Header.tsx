import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@components/Button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@assets/img/LogoBW.png';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';

const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'sobrenosotros', label: 'Quienes somos' },
    { id: 'instalaciones', label: 'Instalaciones' },
    { id: 'inscripcion', label: 'Inscripción' },
    { id: 'galeria', label: 'Galería' },
];

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (val: boolean) => void;
}

const Header: FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const getPath = (id: string) => (id === 'home' ? '/' : `/${id}`);
    const isActive = (id: string) => location.pathname === getPath(id);
    const hasConfigLogin = import.meta.env.VITE_ENABLE_LOGIN_USER === 'true';

    if (!hasConfigLogin && user) {
        auth.signOut();
    }

    return (
        <nav className="sticky top-0 bg-white shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-3 md:px-4">
                {/* Desktop */}
                <div className="hidden md:flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 py-1" />
                    </Link>
                    <div className="flex items-center space-x-8">
                        {menuItems.map(({ id, label }) => (
                            <Link
                                key={id}
                                to={getPath(id)}
                                className={`nav-link text-sm ${
                                    isActive(id)
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    {hasConfigLogin && (
                        <div className="hidden md:flex items-center space-x-4 text-sm">
                            {user ? (
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    <span className="text-gray-700 font-medium">
                                        {user.displayName || user.email}
                                    </span>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-gray-600 font-bold">
                                            {user.displayName
                                                ? user.displayName[0].toUpperCase()
                                                : user.email?.[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-1 text-gray-500 hover:text-primary transition"
                                    >
                                        <LogIn size={16} />
                                        <span>Iniciar sesión</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex items-center gap-1 text-gray-500 hover:text-primary transition"
                                    >
                                        <UserPlus size={16} />
                                        <span>Crear cuenta</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {/* Mobile */}
                <div className="md:hidden flex justify-between items-center h-14">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 py-1" />
                    </Link>
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden px-2 pt-2 pb-3 space-y-1"
                    >
                        {menuItems.map(({ id, label }) => (
                            <Link
                                key={id}
                                to={getPath(id)}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive(id)
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-muted'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {hasConfigLogin && !user && (
                            <div className="mt-4 flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
                                >
                                    <LogIn size={16} />
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
                                >
                                    <UserPlus size={16} />
                                    Crear cuenta
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
