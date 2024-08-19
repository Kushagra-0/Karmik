import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
    username: string;
    email: string;
    role: string;
    // Add other fields as needed
}

const ProfileUser = ({ userId }: { userId: string }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('User ID:', userId);
        console.log('API URL:', `${import.meta.env.VITE_API_BASE_URL}/user/${userId}`);
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`);
                setUserProfile(res.data);
                setFormData(res.data);
            } catch (err) {
                setError('Error fetching user profile');
            }
        };

        fetchUserProfile();
    }, [userId]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserProfile(res.data);
            setEditMode(false);
        } catch (err) {
            setError('Error updating profile');
        }
    };

    if (error) return <p>{error}</p>;
    if (!userProfile) return <p>Loading...</p>;

    const loggedInUserId = localStorage.getItem('userId'); // Assuming you store userId in localStorage

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">{editMode ? 'Edit Profile' : 'Profile'}</h1>

            {editMode ? (
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData?.username || ''}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData?.email || ''}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <div>
                    <p className="text-lg mb-2"><strong>Username:</strong> {userProfile.username}</p>
                    <p className="text-lg mb-2"><strong>Email:</strong> {userProfile.email}</p>
                    <p className="text-lg mb-2"><strong>Role:</strong> {userProfile.role}</p>

                    {loggedInUserId === userId && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileUser;
