// src/routes/Routes.tsx
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Login from '../pages/Login';
import Index from '../pages/Index';
import Admin from '../pages/Admin';
import User from '../pages/User';
import Unauthorized from '../pages/Unauthorized';
import Register from '../pages/Signup';

const routes = createRoutesFromElements(
    <>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes with role-based access */}
        <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
            <Route path="/user" element={<User />} /> 
        </Route>
    </>
);

export const router = createBrowserRouter(routes);