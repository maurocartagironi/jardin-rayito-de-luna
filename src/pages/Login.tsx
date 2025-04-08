import { auth, googleProvider } from '@/firebase';
import {
    AuthError,
    EmailAuthProvider,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    linkWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Escuchar el estado de autenticación
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate('/dashboard');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as AuthError;
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('Ingresá tu email para recuperar la contraseña.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Correo de recuperación enviado.');
        } catch (error: unknown) {
            const err = error as AuthError;
            setError(err.message);
        }
    };

    const handleLoginWithProvider = async (provider: GoogleAuthProvider) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;

            // Verificamos si ya existe ese email
            const methods = await fetchSignInMethodsForEmail(
                auth,
                googleUser.email!
            );

            if (
                methods.includes('password') &&
                !googleUser.providerData.some(
                    (p) => p.providerId === 'password'
                )
            ) {
                // Si hay método password pero no está vinculado todavía → vinculamos
                const password = prompt(
                    'Ya existe una cuenta con este email. Ingresá tu contraseña para vincular:'
                );
                if (password) {
                    const credential = EmailAuthProvider.credential(
                        googleUser.email!,
                        password
                    );
                    await linkWithCredential(googleUser, credential);
                    toast.success(
                        'Cuenta vinculada exitosamente con contraseña 🔒'
                    );
                }
            }

            navigate('/dashboard');
        } catch (err: any) {
            console.error('Error en login con Google:', err);
            toast.error(err.message || 'Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div className="flex items-baseline justify-center bg-muted px-4 py-10">
            <div className="w-full max-w-md bg-card text-card-foreground shadow-md rounded-xl p-8 font-[SalesforceSans]">
                <h2 className="text-3xl font-bold text-center mb-6 rainbow-text">
                    Iniciar sesión
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="flex justify-between mt-4 text-sm">
                    <button
                        type="button"
                        onClick={handleResetPassword}
                        className="text-primary underline hover:opacity-80"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-primary underline hover:opacity-80"
                    >
                        Crear cuenta
                    </button>
                </div>

                <div className="my-6 border-t border-border relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-3 text-muted-foreground text-sm">
                        o continuar con
                    </span>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => handleLoginWithProvider(googleProvider)}
                        className="w-full flex items-center justify-center gap-2 border border-input py-2 rounded-md hover:bg-muted transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Google
                    </button>
                </div>

                {error && (
                    <p className="text-red-600 text-sm mt-4 text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
