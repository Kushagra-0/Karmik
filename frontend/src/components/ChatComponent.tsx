import { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";

interface Message {
  sender: string,
  text: string,
  conversationId: string
}

const ChatComponent: React.FC = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    const getConversations = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/conversation/${userId}`);
        setConversations(res.data);
      } catch(err) {
        console.log(err);
      }
    }

    getConversations();
  }, [userId])

  useEffect(() => {
    const getMessages = async() => {
      try{
        if(currentChat) {
          const res = await axios.get(`http://localhost:5000/api/message/${currentChat._id}`);
          setMessages(res.data);
        }
      } catch(err) {
        console.log(err);
      }
    }

    getMessages();
  }, [currentChat])


  // const handleSendMessage = () => {
  //   if (inputMessage.trim() === "" || !selectedChat) return;
  //   setMessages({
  //     ...messages,
  //     [selectedChat.id]: [...(messages[selectedChat.id] || []), { text: inputMessage, sender: "You" }],
  //   });
  //   setInputMessage("");
  // };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage, 
      conversationId: currentChat._id
    }

    try{
      const res = await axios.post("http://localhost:5000/api/message/", message);
      setMessages((prevMessages) => [...prevMessages, res.data]); // Correct way
      setNewMessage("");
    } catch(err) {
      console.log(err); 
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex mt-28 mb-20 bg-gray-100 w-3/4">
      {/* Chat Menu */}
      <div className="w-1/4 bg-white shadow-md">
        <h2 className="text-white inline-flex justify-center bg-orange-600 px-4 py-1.5 rounded-full text-sm whitespace-nowrap m-4">
           All Messages
        </h2>
        <div>
          {conversations.map((c: any) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Chatbox */}
      <div className="flex-1 flex flex-col bg-white shadow-md">
        {currentChat ? (
          <>
            <div className="p-4 border-b font-bold text-gray-700">{currentChat.members.find((m:any) => m !== userId)}</div>

            {/* Messages Container */}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[58vh]">
              {messages.map((m:any) => (
                <>
                  <Message message={m} own={m.sender === userId} />
                </>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className={`ml-2 p-2 rounded-lg ${
                  newMessage.trim() ? "bg-orange-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!newMessage.trim()} // Disable when input is empty
              >
                <Send />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
