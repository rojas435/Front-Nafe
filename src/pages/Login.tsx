import React, { useState } from 'react';
import { login } from '../services/AuthService';
import background from '../assets/login.png';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(username, password);
        if (!success) {
            setError('Failed to login');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen w-full relative">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Content Container */}
            <div className="relative min-h-screen w-full flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/50 rounded-xl w-full max-w-md p-8 shadow-2xl">
                    <h2 className="text-3xl font-extrabold text-center text-white mb-8">
                        Sign in to your account
                    </h2>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                            <p className="text-red-200 text-center text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;