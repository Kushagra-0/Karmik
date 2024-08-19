import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, formData);
            const { token, role } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role); // Store role in local storage
            navigate('/dashboard'); // Redirect to the dashboard after login
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                console.error(err.response.data);
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFA500]">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center mb text-black">Login</h1>
                <h1 className="text-5xl font-bold text-center mb-6 text-black">To Karmik</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-11 text-center">
                    <p className="text-black text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-black hover:text-[#FFA500] font-bold hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;
