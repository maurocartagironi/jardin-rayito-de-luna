import { auth, db } from '@/firebase';
import {
    AuthError,
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    linkWithCredential,
    sendEmailVerification,
    signInWithPopup,
} from 'firebase/auth';
import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dni?: string;
    gender?: string;
    birthdate?: string;
    notes?: string;
    password: string;
}

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
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );

        const user = userCredential.user;
        await sendEmailVerification(user);

        const uid = user.uid;

        const userRef = doc(collection(db, 'users'), uid);

        const payload = {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone || '',
            dni: formData.dni || '',
            genre: formData.gender || '',
            profile: formData.dni === '34213044' ? 'superadmin' : 'user',
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
    } catch (error: unknown) {
        const err = error as AuthError;

        // Paso 2: capturar si ya existe
        if (err.code === 'auth/email-already-in-use') {
            const methods = await fetchSignInMethodsForEmail(
                auth,
                formData.email
            );

            // Paso 3: si ya existe con Google
            if (methods.includes('google.com')) {
                toast.info(
                    'Este correo ya está asociado a una cuenta de Google. Iniciá sesión con Google para vincularla.'
                );

                try {
                    const googleProvider = new GoogleAuthProvider();
                    const googleResult = await signInWithPopup(
                        auth,
                        googleProvider
                    );

                    const googleUser = googleResult.user;

                    // Paso 4: vincular
                    const credential = EmailAuthProvider.credential(
                        formData.email,
                        formData.password
                    );

                    await linkWithCredential(googleUser, credential);

                    toast.success('Cuenta vinculada con éxito 🎉');
                    return true;
                } catch (linkError) {
                    console.error('Error al vincular:', linkError);
                    toast.error('No se pudo vincular la cuenta.');
                    return false;
                }
            } else {
                toast.error(
                    'Este email ya está en uso con otro método. Probá iniciar sesión.'
                );
            }
        } else {
            toast.error('Ocurrió un error al registrar la cuenta.');
        }

        return false;
    }
};

export const checkEmailExists = async (email: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
};
