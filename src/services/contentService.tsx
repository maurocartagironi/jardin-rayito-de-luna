import { db } from '@/firebase';
import {
    collection,
    DocumentData,
    getDocs,
    query,
    where,
} from '@firebase/firestore';

export const getContentData = async (type: string) => {
    try {
        const q = query(collection(db, 'content'), where('type', '==', type));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const dataList: Content[] = snapshot.docs.map(
                (doc: DocumentData) => ({
                    title: doc.data().title,
                    description: doc.data().description,
                    image: doc.data().image,
                    button: doc.data().button,
                    index: doc.data().index ?? 0,
                    emoji: doc.data().emoji,
                    icon: doc.data().icon,
                    type: doc.data().type,
                })
            );

            dataList.sort((a, b) => a.index - b.index);

            return dataList;
        }
    } catch (error) {
        console.error('Error cargando contenido:', error);
    }
};
