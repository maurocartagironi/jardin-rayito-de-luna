import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <div className="w-5 h-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
        );
    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default ProtectedRoute;
