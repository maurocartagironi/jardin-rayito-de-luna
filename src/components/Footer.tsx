import { FC } from 'react';
import {
    Facebook,
    Instagram,
    Triangle,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react';

const Footer: FC = () => {
    return (
        <footer className="bg-primary/10 text-gray-700 pt-10 pb-6">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo y nombre */}
                <div>
                    <h2 className="text-2xl font-bold text-red-500 mb-2">
                        Mi rayito de Luna
                    </h2>
                    <p className="text-sm text-gray-600">
                        Un espacio donde los niños crecen jugando, creando y
                        descubriendo.
                    </p>
                </div>

                {/* Navegación */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        Secciones
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#home" className="hover:text-red-400">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="/sobrenosotros"
                                className="hover:text-red-400"
                            >
                                Quienes somos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/instalaciones"
                                className="hover:text-red-400"
                            >
                                Instalaciones
                            </a>
                        </li>
                        <li>
                            <a
                                href="/inscripcion"
                                className="hover:text-red-400"
                            >
                                Inscripción
                            </a>
                        </li>
                        <li>
                            <a href="/galeria" className="hover:text-red-400">
                                Galería
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        Contacto
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-red-400" /> +54 9 11
                            2345-6789
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-red-400" />{' '}
                            contacto@mirayitodeluna.com
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-red-400" /> Av.
                            Principal 123, Buenos Aires
                        </li>
                    </ul>
                </div>

                {/* Redes sociales */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-500">
                        Redes Sociales
                    </h3>
                    <div className="flex gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook className="h-5 w-5 hover:text-red-400" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram className="h-5 w-5 hover:text-red-400" />
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Triangle className="h-5 w-5 hover:text-red-400" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Mi rayito de Luna. Todos los
                derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
