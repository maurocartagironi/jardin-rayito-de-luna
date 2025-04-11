import { clsx, ClassValue } from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertDate = (date: Timestamp | undefined) => {
    const formattedDate = date?.toDate().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    const capitalizedDate = formattedDate
        ? formattedDate?.charAt(0).toUpperCase() + formattedDate?.slice(1)
        : '';

    return capitalizedDate;
};

export function formatPhoneNumber(number: string) {
    if (!number) return '';

    const regex = /^(\d{2})(\d)(\d{2})(\d{4})(\d{4})$/;
    const match = number.match(regex);

    if (!match) return number;

    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}-${match[5]}`;
}
