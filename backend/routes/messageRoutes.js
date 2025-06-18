const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

// @route   POST /api/messages
// @desc    Create new message
// @access  Public
router.post('/', messageController.createMessage);

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private
router.get('/', protect, messageController.getAllMessages);

// @route   GET /api/messages/:id
// @desc    Get single message
// @access  Private
router.get('/:id', protect, messageController.getMessage);

// @route   PUT /api/messages/:id/mark-read
// @desc    Mark message as read
// @access  Private
router.put('/:id/mark-read', protect, messageController.markAsRead);

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private
router.delete('/:id', protect, messageController.deleteMessage);

module.exports = router;