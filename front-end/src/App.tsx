// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard'; // Ejemplo de una ruta protegida
//import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={

                    }
                />
                {/* más rutas aquí */}
            </Routes>
        </Router>
    );
};

export default App;
