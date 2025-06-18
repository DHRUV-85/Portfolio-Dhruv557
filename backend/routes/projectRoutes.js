const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/auth');

// Verify your controller functions exist
// console.log('createProject type:', typeof projectController.createProject);
// console.log('updateProject type:', typeof projectController.updateProject);
// console.log('deleteProject type:', typeof projectController.deleteProject);

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', projectController.getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', projectController.getProject);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', protect, upload.single('image'), projectController.createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', protect, upload.single('image'), projectController.updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;