import { useAnalytics } from '@/hooks/useAnalytics';
import { label } from '@/labels/labels';
import { getImagePath } from '@/utils/images.utils';

export const Contacto = () => {
    const { sendEvent } = useAnalytics();

    const encodedMessage = encodeURIComponent(label.whatsAppMessage);
    const whatsappLink = `https://wa.me/${label.company.phoneNumber}?text=${encodedMessage}`;

    const handleClick = () => {
        sendEvent('click_whatsapp', {
            from_section: 'Contacto',
            phone: label.company.phoneNumber,
        });
    };

    return (
        <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">
                {label.wantToKnow.title}
            </h2>
            <p className="mb-6">{label.wantToKnow.message}</p>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="inline-flex items-center gap-3 border-2 text-white font-medium text-lg px-4 py-2 rounded-xl transition border-white md:border-primary hover:border-white"
            >
                <img
                    className="w-10 h-10"
                    src={getImagePath('whatsapp.svg')}
                    alt="WhatsApp"
                />
                {label.wantToKnow.buttonMessage}
            </a>
        </section>
    );
};
