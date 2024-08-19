import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

interface Post {
    _id: string;
    heading: string;
    description: string;
}

const UserPosts = ({ userId }: { userId: string }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(res.data);
            } catch (err) {
                setError('Error fetching posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [userId]);


    const deletePost = async (postId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted post from the posts array
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                console.error(err.response.data);
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };


    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">Posts by User</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post._id} className="p-4 bg-gray-100 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        <Link to={`/posts/${post._id}`} className="text-black hover:text-[#FFA500] hover:underline">
                            {post.heading}
                        </Link>
                        </h2>
                        <p className="text-gray-600">{post.description}</p>
                        <button
                            onClick={() => deletePost(post._id)}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Delete Post
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;
