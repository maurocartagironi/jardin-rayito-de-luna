// src/hooks/useValidationToast.ts
import { toast } from 'react-toastify';

export const useValidationToast = () => {
    const validateField = (condition: boolean, message: string): boolean => {
        if (!condition) {
            toast.error(message);
            return false;
        }
        return true;
    };

    return { validateField };
};
