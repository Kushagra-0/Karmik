import { useEffect, useState } from 'react';
import CreatePost from '../components/createPost';
import UserPosts from '../components/userPosts';
import { jwtDecode } from 'jwt-decode';

const DonorDashboard = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: any = jwtDecode(token); // Use jwt_decode to decode the token
            setUserId(decodedToken.user.id);
        }
    }, []);

    if (!userId) return <p>Loading...</p>;

    return (
        <div>
            <CreatePost />
            <div>
                <UserPosts userId={userId}/>
            </div>
        </div>
    );
};

export default DonorDashboard;
