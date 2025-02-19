import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";


const Conversation = ({conversation} : any) => {
    const [user, setUser] = useState(null);
    const { userId } = useAuth();

    useEffect(() => {
        const friendId = conversation.members.find((m:any) => m !== userId);
        setUser(friendId);
    }, [conversation, userId]);

    console.log(conversation);  

    return (
        <div className={`cursor-pointer border`}>
            <div className="hover:border-l-4 pl-2 py-4 hover:border-orange-600">
                User
                {user}
            </div>
        </div>
    )
}

export default Conversation