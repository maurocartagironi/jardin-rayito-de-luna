import { Nosotros } from '@components/home/Nosotros';
import { Hero } from '@components/home/Hero';
import { Pilares } from '@/components/home/Pilares';
import { Actividades } from '@components/home/Actividades';
import { Testimonios } from '@components/home/Testimonios';
import { Galeria } from '@components/home/Galeria';
import { Contacto } from '@components/home/Contacto';
import Noticias from '../components/home/Noticias';

export default function Home() {
    return (
        <div className="font-[SalesforceSans]">
            <Hero />
            <Nosotros />
            <Pilares />
            <Actividades />
            <Galeria />
            <Noticias />
            <Testimonios />
            <Contacto />
        </div>
    );
}
