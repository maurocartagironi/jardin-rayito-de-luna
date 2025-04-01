import { useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    AuthError,
    User,
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/firebase';
import { useNavigate } from 'react-router-dom';

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

    const handleLoginWithProvider = async (
        provider: GoogleAuthProvider | FacebookAuthProvider
    ) => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Usuario logueado:', result.user);
            setUser(result.user);
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as AuthError;
            console.error('Error con login popup:', err.message);
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-10">
            <div className="w-full max-w-md bg-card text-card-foreground shadow-xl rounded-xl p-8 font-[SalesforceSans]">
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

                    <button
                        onClick={() =>
                            handleLoginWithProvider(facebookProvider)
                        }
                        className="w-full flex items-center justify-center gap-2 bg-[#1877f2] text-white py-2 rounded-md hover:opacity-90 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/303117/facebook-2-logo.svg"
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                        Facebook
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
