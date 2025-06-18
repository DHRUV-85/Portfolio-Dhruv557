const Message = require("../models/Message")
const { sendEmail } = require("../utils/emailService")
const { success, error } = require("../utils/response")
const logger = require("../utils/logger")

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return error(res, 400, "All fields are required")
    }

    // Create message
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    })

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Message Received",
        text: `You have a new message from ${name} (${email}):

Subject: ${subject}

Message:
${message}`,
        message: `You have a new message from ${name} (${email}):

Subject: ${subject}

Message:
${message}`,
      })

      logger.info(`Notification email sent for message from ${email}`)
    } catch (emailError) {
      logger.error(`Failed to send notification email: ${emailError.message}`)
    }

    return success(res, 201, newMessage, "Message sent successfully")
  } catch (err) {
    logger.error(`Error creating message: ${err.message}`)
    return error(res, 500, "Server Error")
  }
}

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
exports.getAllMessages = async (req, res, next) => {
  try {
    // Sorting: newest first, unread first
    const messages = await Message.find().sort({ read: 1, createdAt: -1 })
    return success(res, 200, messages)
  } catch (err) {
    logger.error(`Error fetching messages: ${err.message}`)
    return error(res, 500, "Server Error")
  }
}

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return error(res, 404, "Message not found")
    }

    // Mark as read if not already
    if (!message.read) {
      message.read = true
      await message.save()
    }

    return success(res, 200, message)
  } catch (err) {
    logger.error(`Error fetching message: ${err.message}`)
    return error(res, 500, "Server Error")
  }
}

// @desc    Mark message as read
// @route   PUT /api/messages/:id/mark-read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true, runValidators: true })

    if (!message) {
      return error(res, 404, "Message not found")
    }

    return success(res, 200, message, "Message marked as read")
  } catch (err) {
    logger.error(`Error marking message as read: ${err.message}`)
    return error(res, 500, "Server Error")
  }
}

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return error(res, 404, "Message not found")
    }

    return success(res, 200, null, "Message deleted")
  } catch (err) {
    logger.error(`Error deleting message: ${err.message}`)
    return error(res, 500, "Server Error")
  }
}
