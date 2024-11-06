import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import HomePage from './pages/HomePage';
//import Dashboard from './pages/Dashboard';

<Router>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* otras rutas */}
    </Routes>
</Router>
