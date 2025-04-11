const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { auth, adminAuth } = require('../middlewares/auth');

// Public routes
router.get('/post/:slug', commentController.getCommentsForPost);


// Protected routes
router.post('/', auth, commentController.createComment);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);

// Admin routes
router.put('/:id/moderate', adminAuth, commentController.moderateComment);

module.exports = router;