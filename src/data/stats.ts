// src/data/stats.ts
import StatItem from '../types/StatItem';
import { Users, GraduationCap, Home, CalendarCheck } from 'lucide-react';

export const stats: StatItem[] = [
    {
        value: 30,
        title: 'Niños y niñas',
        icon: Users,
        description: 'Espacio para crecer juntos',
    },
    {
        value: 6,
        title: 'Docentes dedicadas',
        icon: GraduationCap,
        description: 'Formación en educación inicial',
    },
    {
        value: 4,
        title: 'Salas equipadas',
        icon: Home,
        description: 'Ambientes seguros y creativos',
    },
    {
        value: 2025,
        title: 'Año de apertura',
        icon: CalendarCheck,
        description: '¡Un comienzo lleno de ilusión!',
    },
];
