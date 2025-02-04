const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

let users = [];

const addUser = (userId, socketId) => {
    if (!userId) {
        return;
    }
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    users = users.filter((user)=>user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user)=>user.userId === userId);
}

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("addUser" , userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    
    const user = getUser(receiverId);

    if (user) {
        try {
            io.to(user.socketId).emit("getMessage", {
                senderId, 
                text,
            });
        } catch (error) {
            console.error('Error emitting message:', error);
        }
    } else {
        console.log('Receiver not found in connected users');
    }
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected")
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
