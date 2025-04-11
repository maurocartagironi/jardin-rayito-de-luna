import { Timestamp } from 'firebase/firestore';

export interface News {
    headline: string;
    lead: string;
    htmlbody: string;
    image: string;
    imagetext: string;
    index: number;
    date: Timestamp;
    author: string;
    isactive: boolean;
    id: string;
}
