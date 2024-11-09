// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard'; // Ejemplo de una ruta protegida
//import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    // Placeholder component for no leave blank element
    const PlaceholderComponent = () => <div>Placeholder</div>;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={<PlaceholderComponent />}
                />
                {/* más rutas aquí */}
            </Routes>
        </Router>
    );
};

export default App;
