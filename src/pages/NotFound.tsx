import { Link } from 'react-router-dom';
import { Button } from '@components/Button';

const NotFound: React.FC = () => {
    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
            <p className="text-2xl md:text-3xl font-semibold mb-2">
                ¡Uy! Página no encontrada
            </p>
            <p className="text-muted-foreground text-lg max-w-xl mb-8">
                Lo sentimos, la página que estás buscando no existe o fue
                movida. Podés volver a la página principal o explorar otras
                secciones del sitio.
            </p>
            <Button variant="default" asChild>
                <Link to="/">Volver al inicio</Link>
            </Button>
        </section>
    );
};

export default NotFound;
