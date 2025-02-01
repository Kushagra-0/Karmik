const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
