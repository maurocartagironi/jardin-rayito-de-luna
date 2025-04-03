export const Contacto = () => {
    const data = {
        phoneNumber: '5491123456789',
        message: 'Hola, me gustaría obtener más información sobre el jardín.',
    };

    const encodedMessage = encodeURIComponent(data.message);
    const whatsappLink = `https://wa.me/${data.phoneNumber}?text=${encodedMessage}`;

    return (
        <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">¿Querés saber más?</h2>
            <p className="mb-6">
                Escribinos por WhatsApp para agendar una entrevista
                personalizada.
            </p>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-primary hover:border-white text-white font-medium text-lg px-4 py-2 rounded-xl transition"
            >
                <img
                    className="w-10 h-10"
                    src="https://www.svgrepo.com/show/452133/whatsapp.svg"
                    alt="WhatsApp"
                />
                Contactanos por WhatsApp
            </a>
        </section>
    );
};

export default Contacto;
