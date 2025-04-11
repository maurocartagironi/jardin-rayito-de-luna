import { useRouter } from '@/context/RouterContext';
import logo from '@assets/img/LogoHeader.png';
import logotext from '@assets/img/LogoText.png';
import { Button } from '@components/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const { routers } = useRouter();
    const menues = routers.filter((item) => item.showbar);
    const location = useLocation();

    const getPath = (id: string) => (id === 'home' ? '/' : `/${id}`);
    const isActive = (id: string) => location.pathname === getPath(id);

    return (
        <nav className="sticky top-0 bg-white shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-3 md:px-4">
                {/* Desktop */}
                <div className="hidden md:flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-[60px] py-1"
                            />
                        </Link>
                        <Link to="/" className="flex items-center">
                            <img
                                src={logotext}
                                alt="Logo"
                                className="h-[55px] py-1"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        {menues.map((menu: Router) => (
                            <Link
                                key={menu.id}
                                to={menu.url}
                                className={`nav-link text-sm ${
                                    isActive(menu.url)
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                {menu.name}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Mobile */}
                <div className="md:hidden flex justify-between items-center h-14">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-[55px] py-1"
                            />
                        </Link>
                        <div className="flex items-center">
                            <img
                                src={logotext}
                                alt="Logo"
                                className="h-[50px] py-1"
                            />
                        </div>
                    </div>
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
                        className="md:hidden pt-2 space-y-1"
                    >
                        <div className="px-2">
                            {menues.map((menu: Router) => (
                                <Link
                                    key={menu.id}
                                    to={menu.url}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive(menu.url)
                                            ? 'bg-primary text-white'
                                            : 'text-gray-600 hover:bg-muted'
                                    }`}
                                >
                                    {menu.name}
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
