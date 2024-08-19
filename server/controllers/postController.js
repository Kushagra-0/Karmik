const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createPost = async (req, res) => {
    const { heading, description, phoneNumber, location, city } = req.body;

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const createdBy = decoded.user.id;

        const user = await User.findById(createdBy);
        if (!user || user.role !== 'donor') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const newPost = new Post({
            heading,
            description,
            phoneNumber,
            location,  // Save the location
            city, // Save the city
            createdBy,
        });

        await newPost.save();
        res.status(201).json({ msg: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy', 'username'); // Populate createdBy with username
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all posts with optional city filter
exports.getAllPostsFromCity = async (req, res) => {
    try {
        const { city } = req.query; // Get city from query parameters
        const filter = {};

        if (city) {
            filter.city = city; // Apply city filter if provided
        }

        const posts = await Post.find(filter).populate('createdBy', 'username'); // Populate createdBy with username
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all posts by a specific user
exports.getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ createdBy: userId }).populate('createdBy', 'username'); // Populate createdBy with username
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the user is authorized to delete the post
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        if (post.createdBy.toString() !== userId) {
            return res.status(403).json({ msg: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('createdBy', 'username');

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};