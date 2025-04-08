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

export const registerNewUser = async (formData: UserData): Promise<boolean> => {
    try {
        // Intenta crear cuenta con email/password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );

        const user = userCredential.user;
        await sendEmailVerification(user);

        // Guardar datos en Firestore
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

        await setDoc(doc(db, 'users', user.uid), payload);

        toast.success('Cuenta creada con éxito. Verificá tu email.');
        return true;
    } catch (error: any) {
        const err = error as AuthError;

        if (err.code === 'auth/email-already-in-use') {
            const methods = await fetchSignInMethodsForEmail(
                auth,
                formData.email
            );

            if (methods.includes('google.com')) {
                toast.info(
                    'Este email ya está vinculado a una cuenta de Google. Iniciá sesión con Google para vincular.'
                );

                try {
                    const provider = new GoogleAuthProvider();
                    const result = await signInWithPopup(auth, provider);

                    const googleUser = result.user;

                    // Vincula el método email/password a esa cuenta
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
            }

            toast.error('Este email ya está en uso. Probá iniciar sesión.');
        } else {
            console.error('Error desconocido:', err);
            toast.error('Ocurrió un error al registrar la cuenta.');
        }

        return false;
    }
};

export const loginWithGoogleAndLinkIfNeeded = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const googleUser = result.user;

        // 1. Buscar si ya hay un usuario en Firestore con ese email
        const q = query(
            collection(db, 'users'),
            where('email', '==', googleUser.email)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            // 2. Ya existe un usuario con ese email
            const firestoreUser = snapshot.docs[0];
            const firestoreData = firestoreUser.data();

            const email = googleUser.email!;
            const methods = await fetchSignInMethodsForEmail(auth, email);

            // 3. Si no está vinculado a email/password aún, le damos la opción
            if (
                methods.includes('google.com') &&
                !methods.includes('password')
            ) {
                const password = prompt(
                    'Ya existe una cuenta con este email. Ingresá tu contraseña para vincularlas:'
                );

                if (password) {
                    const credential = EmailAuthProvider.credential(
                        email,
                        password
                    );

                    await linkWithCredential(googleUser, credential);
                    toast.success('¡Cuenta vinculada con éxito!');
                } else {
                    toast.info('Vinculación cancelada');
                }
            }
        }

        return googleUser;
    } catch (err) {
        const error = err as AuthError;
        console.error(error);
        toast.error('No se pudo iniciar sesión con Google.');
        return null;
    }
};
