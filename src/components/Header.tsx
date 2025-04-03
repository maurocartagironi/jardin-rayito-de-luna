import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@components/Button';
import { Link, useLocation } from 'react-router-dom';
import logo from '@assets/img/LogoBW.png';

interface MenuItem {
    id: string;
    label: string;
}

const menuItems: MenuItem[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'sobrenosotros', label: 'Quienes somos' },
    { id: 'instalaciones', label: 'Instalaciones' },
    { id: 'inscripcion', label: 'Inscripción' },
    { id: 'galeria', label: 'Galería' },
];

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const getPath = (id: string) => (id === 'home' ? '/' : `/${id}`);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 py-1" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={getPath(item.id)}
                                className={`nav-link ${
                                    location.pathname === getPath(item.id)
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={getPath(item.id)}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block w-full px-3 py-2 rounded-md text-base font-medium ${
                                        location.pathname === getPath(item.id)
                                            ? 'bg-primary text-white'
                                            : 'text-gray-600 hover:bg-muted'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
