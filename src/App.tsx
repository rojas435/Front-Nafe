import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './app.css';
import { router } from './routes/Routes';

const App: React.FC = () => (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

export default App;