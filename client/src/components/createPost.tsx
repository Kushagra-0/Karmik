import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import MapSelector from './mapSelector';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        phoneNumber: '',
        location: { lat: 0, lng: 0 },  // Initialize location in form data
        city: '', // Add city to form data
    });

    const { heading, description, phoneNumber, city } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData((prevData) => ({
            ...prevData,
            location,  // Only update the location while preserving other fields
        }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(res.data);
            // navigate('/posts'); // Redirect to the posts page after successful creation
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                console.error(err.response.data);
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[1200px] bg-[#FFA500]">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Create Post</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Heading:</label>
                        <input
                            type="text"
                            name="heading"
                            value={heading}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline h-32 resize-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                        <MapSelector onLocationSelect={onLocationSelect} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-black hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
