import { useNavigate } from 'react-router-dom';
import Logout from '../components/LogOut';
import BackButton from '../components/BackButton';

const User = () => {
    const navigate = useNavigate();

    // Funciones de navegación
    const goToMachines = () => navigate('/machines');
    const goToRoutines = () => navigate('/routines');
    const goToSchedules = () => navigate('/schedules');

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6"> ¡¡ Helloooo there!! </h1>
                <p className="text-center text-gray-700 mb-8">
                    ¡¡ welcome !!
                </p>

                {/* Menú de opciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Enlace a Máquinas */}
                    <button
                        onClick={goToMachines}
                        className="bg-blue-500 text-white font-medium py-4 px-6 rounded-lg hover:bg-blue-600 transition"
                    >
                        Look machines
                    </button>

                    {/* Enlace a Rutinas */}
                    <button
                        onClick={goToRoutines}
                        className="bg-green-500 text-white font-medium py-4 px-6 rounded-lg hover:bg-green-600 transition"
                    >
                        Look routines
                    </button>

                    {/* Enlace a Horarios */}
                    <button
                        onClick={goToSchedules}
                        className="bg-purple-500 text-white font-medium py-4 px-6 rounded-lg hover:bg-purple-600 transition"
                    >
                        Look schedules
                    </button>
                    <Logout />
                </div>
                <BackButton />
            </div>
        </div>
    );
};

export default User;
