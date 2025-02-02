const express = require('express');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with frontend URL
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.eventId).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
