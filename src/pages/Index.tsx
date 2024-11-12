// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png';

const Index: React.FC = () => {

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: `url(${background})` }}>
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <div className="text-2xl font-bold">Nafe&apos;s GYM</div>
                    <ul className="hidden md:flex space-x-6">
                        <li><Link to="/" className="text-green-400">Home</Link></li>
                        <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
                    </ul>
                    <div className="flex space-x-4">
                        <Link to="/login">
                            <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition">
                                Log in
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition">
                                Register
                            </button>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto px-4 py-20">
                <div className="max-w-3xl">
                    <h2 className="text-green-400 text-xl mb-4">Unleash Your Potential</h2>
                    <h1 className="text-5xl font-bold mb-6">YOUR DESTINATION FOR HEALTH AND WELLNESS</h1>
                    <p className="text-gray-300 mb-8">From state-of-the-art equipment to expert guidance, we&apos;re here to empower you on your path to a healthier, stronger you.</p>
                </div>
            </main>
        </div>
    );
};

export default Index;
