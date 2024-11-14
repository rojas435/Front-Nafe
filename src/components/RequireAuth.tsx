import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
    // Usa `useAuth` para obtener `isAuthenticated` y `userRole` directamente
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation();

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si está autenticado pero no tiene el rol requerido
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si todo está bien, renderizar los componentes hijos
    return <Outlet />;
};

export default RequireAuth;
