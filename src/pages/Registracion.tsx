import { useEffect, useState } from 'react';
import { useValidationToast } from '@/hooks/useValidationToast';
import { useRegisterUser } from '@/hooks/useRegisterUser';
//import { checkEmailExists } from '@/services/loginService';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import { toast } from 'react-toastify';

const Registracion = () => {
    const [emailValid, setEmailValid] = useState(true);
    const [emailConfirmValid, setEmailConfirmValid] = useState(true);
    const { validateField } = useValidationToast();
    const { formData, setFormData, isLoading, register, setIsLoading } =
        useRegisterUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    const allowedDomains = [
        'gmail.com',
        'hotmail.com',
        'outlook.com',
        'yahoo.com',
        'yopmail.com',
    ];

    const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = email.split('@')[1];
        return regex.test(email) && allowedDomains.includes(domain);
    };

    const isValidConfirmEmail = (email: string) => {
        return email == formData.email;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setFormData((prev) => ({ ...prev, email }));
        setEmailValid(isValidEmail(email));
    };

    const handleEmailConfirmChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const confirmEmail = e.target.value;
        setFormData((prev) => ({ ...prev, confirmEmail }));
        setEmailConfirmValid(isValidConfirmEmail(confirmEmail));
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        const validations = [
            validateField(
                /^[a-zA-ZÀ-ÿ ]+$/.test(formData.firstName),
                'El nombre solo debe contener letras.'
            ),
            validateField(
                /^[a-zA-ZÀ-ÿ ]+$/.test(formData.lastName),
                'El apellido solo debe contener letras.'
            ),
            formData.dni
                ? validateField(
                      /^\d{6,}$/.test(formData.dni),
                      'El DNI debe ser numérico y tener al menos 6 dígitos.'
                  )
                : true,
            validateField(
                isValidEmail(formData.email),
                'Email no válido (debe ser Gmail, Hotmail, etc.)'
            ),
            validateField(
                isValidEmail(formData.confirmEmail),
                'Los correos no coinciden.'
            ),
            validateField(
                formData.password === formData.confirmPassword,
                'Las contraseñas no coinciden.'
            ),
            validateField(
                passwordRegex.test(formData.password),
                'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.'
            ),
        ];

        if (validations.includes(false)) {
            setIsLoading(false);
            return;
        }

        /*const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
            validateField(false, 'Ya existe una cuenta con ese email.');
            setIsLoading(false);
            return;
        }*/
        try {
            const success = await register();

            if (success) {
                await auth.signOut();
                toast.success(
                    'La cuenta ha sido registrada correctamente, inicia sesión para activarla.'
                );
                navigate('/login');
            }
        } catch (error) {
            toast.error('Ha ocurrido un error al crear la cuenta.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                        <p className="text-lg font-semibold text-primary">
                            Creando cuenta...
                        </p>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold text-center mb-6 text-primary">
                Registro
            </h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
                autoComplete="off"
            >
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre *"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido *"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <input
                    type="text"
                    name="dni"
                    placeholder="DNI"
                    value={formData.dni}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                    className={`w-full border rounded-lg px-3 py-2 ${emailValid ? 'border-gray-300' : 'border-red-500'}`}
                />
                {!emailValid && (
                    <span className="text-red-500 text-sm pl-3">
                        Ingresá un email válido (ej: Gmail, Hotmail, Outlook,
                        etc.)
                    </span>
                )}

                <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirmar Email *"
                    value={formData.confirmEmail}
                    onChange={handleEmailConfirmChange}
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    required
                    className={`w-full border rounded-lg px-3 py-2 ${emailConfirmValid ? 'border-gray-300' : 'border-red-500'}`}
                />
                {!emailConfirmValid && (
                    <span className="text-red-500 text-sm pl-3">
                        Los correos no coinciden.
                    </span>
                )}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${
                        formData.gender === ''
                            ? 'text-gray-400'
                            : 'text-gray-700'
                    }`}
                >
                    <option value="" disabled>
                        Seleccioná un género
                    </option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero_no_decirlo">
                        Prefiero no decirlo
                    </option>
                </select>

                <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${
                        formData.birthdate === ''
                            ? 'text-gray-400'
                            : 'text-gray-700'
                    }`}
                />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Contraseña *"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="w-full border rounded-lg px-3 py-2 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Validar contraseña *"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onPaste={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        autoComplete="new-password"
                        className="w-full border rounded-lg px-3 py-2 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    );
};

export default Registracion;
