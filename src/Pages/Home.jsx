import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courtofarm from './../assets/court of arm.jpeg';
import { Login } from '../Components/Fetch'; // Import the Login function

const Home = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Step 1: New state for error message
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Login(userName, password);
        if (result.error.message === 'authentication failed') {
            console.log('Error Login failed');
            setErrorMessage('Authentication failed. Please try again.'); // Step 2: Set error message
        } else if (result) {
            console.log('Login successfully', result);
            sessionStorage.setItem('userData', JSON.stringify(result))
            navigate('/dashboard');
        } else {
            setErrorMessage('An unexpected error occurred. Please try again later.'); // Handle other errors
        }
    };

    return (
        <div className="container mx-auto p-4 h-screen">
             {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="container flex flex-row gap-10 items-center h-full">
                <div className='w-full items-center shadow'>
                    <img src={courtofarm} alt="Image" width="500px" />
                </div>
                <div className='w-full text-center shadow p-10'>
                    <h1 className="text-2xl mb-4">Welcome back!</h1>
                    <form className="w-full max-w-sm mx-auto text-left" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="userName"
                                type="text"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;