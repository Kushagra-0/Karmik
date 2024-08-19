const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a post (only for donors)
router.post('/create', postController.createPost);

// Get all posts
router.get('/', postController.getAllPostsFromCity);

// Get all posts by a specific user
router.get('/user/:userId', postController.getPostsByUser);

// Get a post by ID
router.get('/:id', postController.getPostById);

// Delete a post by ID
router.delete('/:id', postController.deletePost);

module.exports = router;
