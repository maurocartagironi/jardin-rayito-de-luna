import { Button } from '@components/Button';

export const Contacto: React.FC = () => {
    return (
        <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">¿Querés saber más?</h2>
            <p className="mb-6">
                Completá el formulario y te contactamos para una entrevista
                personalizada.
            </p>
            <Button
                variant="secondary"
                className="text-lg px-6 py-3 rounded-xl"
            >
                Contactanos
            </Button>
        </section>
    );
};
