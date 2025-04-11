import { useContent } from '@/context/ContentContext';
import { useRouter } from '@/context/RouterContext';
import { getImagePath } from '@/utils/images.utils';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Topbar: FC = () => {
    const { content } = useContent();
    const { routers } = useRouter();
    const location = useLocation();

    const socialmedias = content.filter((item) => item.type === 'socialmedias');
    const menues = routers.filter((item) => item.showbar);

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
            </div>
        </nav>
    );
};

export default Topbar;
