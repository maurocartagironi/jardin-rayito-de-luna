import { useContent } from '@/context/ContentContext';
import { useRouter } from '@/context/RouterContext';
import { label } from '@/labels/labels';
import { getImagePath } from '@/utils/images.utils';
import { Mail, MapPin, Phone, Linkedin, Coffee } from 'lucide-react';
import { FC } from 'react';
import Loading from './Loading';
import { formatPhoneNumber } from '@/utils/utils';

const Footer: FC = () => {
    const { routers } = useRouter();
    const { content } = useContent();
    const data = routers.filter((route: Router) => route.showbar);
    const socialmedias = content.filter((item) => item.type === 'socialmedias');

    return (
        <footer className="bg-primary/10 text-gray-700 pt-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo y nombre */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-2">
                        {label.name}
                    </h2>
                    <p className="text-sm text-gray-600">{label.tagline}</p>
                </div>

                {/* Navegación */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        {label.menufooter.sections}
                    </h3>
                    {data && data.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {data.map((route: Router, index: number) => (
                                <li key={index}>
                                    <a
                                        href={route.url}
                                        className="hover:text-red-400"
                                    >
                                        {route.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-left">
                            <Loading size={5} borderSize={2} />
                        </div>
                    )}
                </div>

                {/* Contacto */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        {label.menufooter.contact}
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-red-400" />
                            <a
                                href={`tel:${formatPhoneNumber(label.company.phoneNumber)}`}
                            >
                                {formatPhoneNumber(label.company.phoneNumber)}
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-red-400" />
                            <a href={`mailto:${label.company.email}`}>
                                {label.company.email}
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-red-400" />
                            {label.company.address}
                        </li>
                    </ul>
                </div>

                {/* Redes sociales */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        {label.menufooter.socialmedias}
                    </h3>
                    {socialmedias && socialmedias.length > 0 ? (
                        <div className="flex gap-4">
                            {socialmedias.map((item) => (
                                <a
                                    href={item.button?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={getImagePath(item.image)}
                                        className="cursor-pointer h-5 w-5 hover:opacity-80"
                                    />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-left">
                            <Loading size={5} borderSize={2} />
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500 px-4">
                © {new Date().getFullYear()} {label.copyright}
            </div>
            <div className="justify-end flex bg-gray-200/90 text-gray-400 text-[10px] text-right align-right py-2 px-2 items-center justify-right">
                <p className=" mr-1">Desarrollado con ❤ © 2025</p>
                <a
                    href="https://www.linkedin.com/in/maurocartagironi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                >
                    <Linkedin className="h-3" />
                </a>
                <a
                    href="https://buymeacoffee.com/mauropitu"
                    className="hover:text-primary"
                >
                    <Coffee className="h-3" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
