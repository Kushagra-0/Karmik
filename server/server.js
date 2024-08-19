const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json({ extended: false }));

app.get("/", (req,res) => {
    res.json("Backend started")
})

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));