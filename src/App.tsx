// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './reducers/Store';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes/Routes';
import './app.css';

const App: React.FC = () => (
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
);

export default App;
