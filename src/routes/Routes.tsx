import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Admin from '../pages/Admin';
import AssignRolesPage from '../pages/AssignRole';
import PermissionEdit from '../pages/EditPermission';
import Index from '../pages/Index';
import Login from '../pages/Login';
import MachinesPage from '../pages/Machine';
import Permissions from '../pages/PermissionPage';
import RolesPage from '../pages/RolePage';
import RoutinesPage from '../pages/Routine';
import SchedulesPage from '../pages/Schedule';
import Register from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';
import User from '../pages/User';
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
            <Route path="/PermissionPage" element={<Permissions />} />
            <Route path="/editPermission/:id" element={<PermissionEdit />} />

           

           
        </Route>

        <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
            <Route path="/user" element={<User />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/schedules" element={<SchedulesPage />} />
        </Route>
    </>
);

export const router = createBrowserRouter(routes, { basename: '/front-nafe' });
