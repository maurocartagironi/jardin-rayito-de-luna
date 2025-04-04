import { useEffect, useState } from 'react';
import { useValidationToast } from '@/hooks/useValidationToast';
import { registerNewUser } from '@/services/loginService';

const Registracion = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { validateField } = useValidationToast();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        phone: '',
        gender: '',
        birthdate: '',
        notes: '',
    });

    const [emailValid, setEmailValid] = useState(true);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setFormData((prev) => ({ ...prev, email }));
        setEmailValid(isValidEmail(email));
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

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
        ];

        if (validations.includes(false)) {
            setIsLoading(false);
            return;
        }

        try {
            await registerNewUser(formData);
            // toast.success('¡Cuenta creada correctamente!');
        } catch (error) {
            // Manejar errores (ya implementado dentro del service si usás toast ahí)
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre *"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido *"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
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
                    required
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`w-full border rounded-lg px-3 py-2 ${
                        emailValid ? 'border-gray-300' : 'border-red-500'
                    }`}
                />
                {!emailValid && (
                    <span className="text-red-500 text-sm pl-3">
                        Ingresá un email válido (ej: Gmail, Hotmail, Outlook,
                        etc.)
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
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Seleccioná un género</option>
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
                    className="w-full border rounded-lg px-3 py-2"
                />

                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Observaciones (alergias, tutor legal, etc.)"
                    className="w-full border rounded-lg px-3 py-2"
                />

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
