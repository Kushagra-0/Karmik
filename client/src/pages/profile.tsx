import { useEffect, useState } from "react";
import ProfileUser from "../components/profileUser";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
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
        <ProfileUser userId={userId}/>
    );
};

export default Profile;
