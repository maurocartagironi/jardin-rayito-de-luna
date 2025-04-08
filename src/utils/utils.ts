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
