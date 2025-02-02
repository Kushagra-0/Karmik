import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const Chats = () => {
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const senderId = searchParams.get("senderId");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages?senderId=${senderId}&receiverId=${receiverId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId,
      receiverId,
      text: newMessage,
    };

    try {
      await axios.post("http://localhost:5000/api/messages", messageData);
      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 shadow-md text-xl font-semibold">Chat</div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg w-fit max-w-xs ${
              msg.senderId === senderId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 flex bg-white shadow-md">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
