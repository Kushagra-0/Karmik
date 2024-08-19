import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

    // Fetch all posts initially
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts`);
                setPosts(res.data);
                setFilteredPosts(res.data); // Initially set filteredPosts to all posts
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    // Filter posts based on search term
    useEffect(() => {
        const filterPosts = async () => {
            if (searchTerm) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
                        params: { city: searchTerm }, // Pass city as a query parameter
                    });
                    setFilteredPosts(res.data); // Update filteredPosts with the search results
                } catch (err) {
                    console.error(err);
                }
            } else {
                setFilteredPosts(posts); // Reset to all posts if searchTerm is empty
            }
        };
        filterPosts();
    }, [searchTerm, posts]); // Refetch when searchTerm or posts change

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Update search term
    };

    return (
        <div className="min-h-screen bg-[#FFA500] p-6 px-32">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search by city"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
                />
            </div>
            <ul className="space-y-6">
                {filteredPosts.map((post) => (
                    <li key={post._id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            <Link to={`/posts/${post._id}`} className="text-black hover:text-[#FFA500] hover:underline">
                                {post.heading}
                            </Link>
                        </h2>
                        <p className="text-gray-700 mb-4">{post.description}</p>
                        <p className='text-black'>{post.city}</p>
                        <small className="text-gray-500">Posted by: {post.createdBy.username}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllPosts;
