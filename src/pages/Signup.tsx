import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/UserReducer';
import { signup } from '../services/AuthService';
import BackButton from '../components/BackButton';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [rh, setRh] = useState('');
    const [weight, setWeight] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!username || !password || !email || !phone || !rh || weight <= 0) {
            setError('All fields are required.');
            return;
        }

        try {
            const result = await signup(username, password, email, phone, rh, weight);

            if (!result) {
                setError('Failed to register. Please try again.');
                return;
            }

            // Dispatch the user data to the Redux store after successful signup
            dispatch(setUser({
                username,
                name: username, // Example, modify based on response data
                email,
                token: 'your-token-here'  // Add the JWT token you receive after registration
            }));

            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000); // Redirect after success
        } catch (err) {
            setError('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
            <div className="bg-gray-800/80 backdrop-blur-md border border-gray-600 rounded-xl w-full max-w-md p-8 shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-white mb-6">
                    Create an Account
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="RH"
                            value={rh}
                            onChange={(e) => setRh(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg"
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <BackButton />
        </div>
    );
};

export default Signup;
