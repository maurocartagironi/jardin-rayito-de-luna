// useRegisterUser.ts
import { registerNewUser } from '@/services/loginService';
import { useState } from 'react';

export const useRegisterUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
        confirmEmail: '',
        phone: '',
        gender: '',
        birthdate: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const register = async (): Promise<boolean> => {
        try {
            setIsLoading(true);
            await registerNewUser(formData);
            return true;
        } catch (error) {
            console.error('Error al registrar:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        isLoading,
        register,
        setIsLoading,
    };
};
