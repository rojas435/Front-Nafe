// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-white text-lg font-semibold hover:text-gray-300 focus:outline-none"
        >
            &larr; Back
        </button>
    );
};

export default BackButton;
