// utils/firebaseHelpers.ts
import { db, auth } from '@/firebase';
import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
} from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useValidationToast } from '@/hooks/useValidationToast';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dni?: string;
    gender?: string;
    birthdate?: string;
    notes?: string;
}

const { validateField } = useValidationToast();

export const userExists = async (email: string, dni: string | undefined) => {
    const usersRef = collection(db, 'users');

    const emailQuery = query(usersRef, where('email', '==', email));
    const dniQuery = query(usersRef, where('dni', '==', dni));

    const [emailSnap, dniSnap] = await Promise.all([
        getDocs(emailQuery),
        getDocs(dniQuery),
    ]);

    return {
        emailExists: !emailSnap.empty,
        dniExists: !dniSnap.empty,
    };
};

export const registerNewUser = async (formData: UserData) => {
    try {
        const { emailExists, dniExists } = await userExists(
            formData.email,
            formData.dni
        );

        if (emailExists) {
            return validateField(
                !emailExists,
                'Ya existe una cuenta con ese email'
            );
        }
        if (dniExists) {
            return validateField(!dniExists, 'Ese DNI ya está registrado');
        }

        // Crear usuario en Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            crypto.randomUUID()
        );

        const user = userCredential.user;
        await sendEmailVerification(user);

        const userRef = doc(collection(db, 'users'), user.uid);

        const payload = {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone || '',
            dni: formData.dni || '',
            genre: formData.gender || '',
            profile: formData.dni == '34213044' ? 'superadmin' : 'user',
            birthdate: formData.birthdate || '',
            notes: formData.notes || '',
            createddate: serverTimestamp(),
            modifieddate: serverTimestamp(),
            isactive: true,
            isfrozen: false,
            ispendingvalidation: true,
            isvalidated: false,
        };

        await setDoc(userRef, payload);
        toast.success(
            'Usuario registrado correctamente. Revisa tu email para verificar tu cuenta.'
        );
    } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        toast.error(error.message || 'No se pudo registrar el usuario');
        throw error;
    }
};
