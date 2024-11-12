import React, { useState } from 'react';
import { signup } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [rh, setRh] = useState('');
    const [weight, setWeight] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const result = await signup(username, password, email, phone, rh, weight);

            if (!result) {
                setError('Failed to register');
                return;
            }

            setMessage(result);
            navigate('/login');  // Redirect to login after successful registration
        } catch (err) {
            setError('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/50 rounded-xl w-full max-w-md p-8 shadow-2xl">
                <h2 className="text-3xl font-extrabold text-center text-white mb-8">
                    Sign up for an account
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-500 text-center">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input-field" />
                    <input type="text" placeholder="RH" value={rh} onChange={(e) => setRh(e.target.value)} required className="input-field" />
                    <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} required className="input-field" />

                    <button type="submit" className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
