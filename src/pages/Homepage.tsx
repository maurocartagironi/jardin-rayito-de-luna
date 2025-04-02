import { Nosotros } from '@components/home/Nosotros';
import { Hero } from '@components/home/Hero';
import { Beneficios } from '@components/home/Beneficios';
import { Actividades } from '@components/home/Actividades';
import { Testimonios } from '@components/home/Testimonios';
import { Galeria } from '@components/home/Galeria';
import { Contacto } from '@components/home/Contacto';

export default function Home() {
    return (
        <div className="font-[SalesforceSans]">
            <Hero />
            <Nosotros />
            <Beneficios />
            <Actividades />
            <Testimonios />
            <Galeria />
            <Contacto />
        </div>
    );
}
