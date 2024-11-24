import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Login from '../pages/Login';
import Index from '../pages/Index';
import Admin from '../pages/Admin';
import User from '../pages/User';
import Unauthorized from '../pages/Unauthorized';
import Register from '../pages/Signup';
import RolesPage from '../pages/RolePage';
import MachinesPage from '../pages/Machine';
import RoutinesPage from '../pages/Routine';
import SchedulesPage from '../pages/Schedule';
import AssignRolesPage from '../pages/AssignRole';
import ListOfUsers from '../pages/UserList';

// 
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
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/assignRoles" element={<AssignRolesPage />} />
            <Route path="/usersList" element={<ListOfUsers />} />
           
        </Route>

        <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
            <Route path="/user" element={<User />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/schedules" element={<SchedulesPage />} />
        </Route>
    </>
);

export const router = createBrowserRouter(routes);
