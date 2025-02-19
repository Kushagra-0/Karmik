import { useEffect, useRef, useState } from "react";
import { Send, Menu, ArrowLeft } from "react-feather";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";
import io from "socket.io-client";
import { baseUrl } from "../common/constants";

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
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<any>()

  const { userId } = useAuth();

  useEffect(() => {
    socket.current = io(`${baseUrl}`);
    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
      if (userId) {
        console.log('Emitting addUser after connection with userId:', userId);
        socket.current.emit("addUser", userId);
      }
    });
    socket.current.on("getMessage", (data:any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().toISOString()
      })
    })

    return () => {
      socket.current.disconnect();
    };
  }, [])

  useEffect(() => {
    if (arrivalMessage && currentChat) {
      if (currentChat.members.includes(arrivalMessage.sender)) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    console.log('Emitting addUser with userId:', userId);
    socket.current.emit("addUser", userId)
    socket.current.on("getUsers", (users:any) => {
      console.log(users)
    })
  }, [userId])

  useEffect(() => {
    const getConversations = async() => {
      try {
        const res = await axios.get(`${baseUrl}/api/conversation/${userId}`);
        setConversations(res.data);
      } catch(err) {
        console.log(err);
      }
    }

    if (userId) getConversations();
  }, [userId])

  useEffect(() => {
    const getMessages = async() => {
      try{
        if(currentChat) {
          const res = await axios.get(`${baseUrl}/api/message/${currentChat._id}`);
          setMessages(res.data);
        }
      } catch(err) {
        console.log(err);
      }
    }

    getMessages();
  }, [currentChat])

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const message = {
        sender: userId,
        text: newMessage, 
        conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find((member:any) => member !== userId);
    console.log('Sending message to receiverId:', receiverId);

    if (receiverId) {
        console.log('Emitting sendMessage event:', {
            senderId: userId,
            receiverId,
            text: newMessage,
        });
        
        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId,
            text: newMessage,
        });
    }

    try {
        const res = await axios.post(`${baseUrl}/api/message/`, message);
        setMessages((prevMessages) => [...prevMessages, res.data]);
        setNewMessage("");
    } catch(err) {
        console.log(err); 
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBackToConversations = () => {
    setCurrentChat(null);
    setIsSidebarOpen(true);
  }

  const handleSelectConversation = (conversation: any) => {
    setCurrentChat(conversation);
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row mt-4 md:mt-28 mb-4 md:mb-20 bg-gray-100 w-full md:w-3/4 mx-auto">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center p-4 bg-white shadow-md">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="mr-4"
        >
          <Menu />
        </button>
        {currentChat && (
          <div className="font-bold text-gray-700">
            {currentChat.members.find((m:any) => m !== userId)}
          </div>
        )}
      </div>

      {/* Chat Menu - Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
        md:static md:block  md:w-1/4
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* <button 
          className="md:hidden absolute top-4 right-4 z-60"
          onClick={() => setIsSidebarOpen(false)}
        >
          <ArrowLeft />
        </button> */}

        <h2 className="text-white inline-flex justify-center bg-orange-600 px-4 py-1.5 rounded-full text-sm whitespace-nowrap m-4">
           All Messages
        </h2>
        <div>
          {conversations.map((c: any) => (
            <div key={c._id} onClick={() => handleSelectConversation(c)}>
              <Conversation conversation={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Chatbox - Mobile & Desktop */}
      <div className={`
        flex-1 flex flex-col bg-white shadow-md
        ${currentChat ? 'block' : 'hidden md:block'}
      `}>
        {currentChat ? (
          <>
            <div className="hidden md:block p-4 border-b font-bold text-gray-700">
              {currentChat.members.find((m:any) => m !== userId)}
            </div>

            {/* Mobile Back Button */}
            <div className="md:hidden p-4 border-b flex items-center">
              <button onClick={handleBackToConversations} className="mr-4">
                <ArrowLeft />
              </button>
              <div className="font-bold text-gray-700">
                {currentChat.members.find((m:any) => m !== userId)}
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[58vh]">
              {messages.map((m:any, index:number) => (
                <Message key={index} message={m} own={m.sender === userId} />
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
                disabled={!newMessage.trim()}
              >
                <Send />
              </button>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center flex-1 text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatComponent;