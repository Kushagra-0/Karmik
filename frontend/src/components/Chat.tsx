import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

interface Message {
  _id: string;
  senderId: string;
  message: string;
}

const Chat = ({ loggedInUserId }: { loggedInUserId: string }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { eventId });

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [eventId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/chat/${eventId}/${loggedInUserId}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [eventId, loggedInUserId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { senderId: loggedInUserId, receiverId: 'receiver-id', eventId, message: newMessage };
      await axios.post('http://localhost:5000/api/chat/send', messageData);
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
      <div className="h-80 overflow-y-auto p-2">
        {messages.map((msg) => (
          <div key={msg._id} className={`p-2 my-2 ${msg.senderId === loggedInUserId ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-2 rounded-md ${msg.senderId === loggedInUserId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          className="flex-grow p-2 border rounded-md"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
