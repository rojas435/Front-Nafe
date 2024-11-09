// src/components/RequireAuth.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface RequireAuthProps {
    redirectPath?: string;
    unAuthorizedPath?: string;
    roles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({
                                                     redirectPath = '/login',
                                                     unAuthorizedPath = '/unauthorized',
                                                     roles = [],
                                                 }) => {
    const authContext = useContext(AuthContext);

    if (!authContext?.isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    if (roles.length > 0 && authContext && !authContext.hasRoles(roles)) {
        return <Navigate to={unAuthorizedPath} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
