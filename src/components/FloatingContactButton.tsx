import { label } from '@/labels/labels';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButton = () => {
    const whatsAppNumber = label.company.phoneNumber;
    const message = encodeURIComponent(label.whatsAppMessage);
    const link = `https://wa.me/${whatsAppNumber}?text=${message}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-4 md:py-3 rounded-full shadow-md transition-all"
        >
            <FaWhatsapp className="w-5 h-5" />
            <span className="hidden sm:inline">{label.floatButton}</span>
        </a>
    );
};

export default FloatingContactButton;
