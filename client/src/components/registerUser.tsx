import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'donor', // default to 'donor'
    });

    const { username, email, password, role } = formData;
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, formData);
            console.log(res.data);
            navigate('/login'); // Redirect to login after successful registration
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
                <h1 className="text-2xl font-bold text-center mb text-black">Register</h1>
                <h1 className="text-5xl font-bold text-center mb-6 text-black">To Karmik</h1>

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-bold mb-2">Role:</label>
                        <select
                            name="role"
                            value={role}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-black focus:shadow-outline "
                        >
                            <option value="donor">Donor</option>
                            <option value="receiver">Receiver</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black hover:bg-[#FFA500]  text-white font-bold py-2 px-4 rounded focus:outline-[#FFA500] focus:shadow-outline"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-11 text-center">
                    <p className="text-black text-sm">
                        Already registered ?{' '}
                        <Link to="/login" className="text-black hover:text-[#FFA500] font-bold hover:underline">
                           Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
