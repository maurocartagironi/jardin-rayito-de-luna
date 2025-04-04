import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButton = () => {
    const whatsappNumber = '5491123456789';
    const message = encodeURIComponent(
        '¡Hola! Me gustaría recibir más información sobre el jardín.'
    );
    const link = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-4 md:py-3 rounded-full shadow-md transition-all"
        >
            <FaWhatsapp className="w-5 h-5" />
            <span className="hidden sm:inline">Escribinos</span>
        </a>
    );
};

export default FloatingContactButton;
