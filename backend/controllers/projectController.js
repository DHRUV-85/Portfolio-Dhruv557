const Project = require("../models/Project")
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary")
const fs = require("fs")
const path = require("path")

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort("-createdAt")

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (err) {
    next(err)
  }
}

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (err) {
    next(err)
  }
}

// @desc    Create project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    console.log("📝 Creating project with data:", req.body)
    console.log("📁 File received:", req.file)

    const { title, description, link, tags, featured } = req.body

    // Validate required fields
    if (!title || !description || !link) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and link",
      })
    }

    let imageData = {}

    if (req.file) {
      try {
        console.log("☁️ Uploading to Cloudinary...")
        const result = await uploadToCloudinary(req.file.path)
        imageData = {
          public_id: result.public_id,
          url: result.secure_url,
        }
        console.log("✅ Image uploaded successfully:", imageData)
      } catch (uploadError) {
        console.error("❌ Cloudinary upload failed:", uploadError)
        // Clean up local file if upload fails
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path)
        }
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        })
      }
    }

    // Process tags
    let processedTags = []
    if (tags) {
      if (typeof tags === "string") {
        processedTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      } else if (Array.isArray(tags)) {
        processedTags = tags
      }
    }

    const project = await Project.create({
      title,
      description,
      link,
      tags: processedTags,
      featured: featured === "true" || featured === true,
      image: imageData,
    })

    console.log("✅ Project created successfully:", project._id)

    res.status(201).json({
      success: true,
      data: project,
    })
  } catch (err) {
    console.error("❌ Error creating project:", err)

    // Clean up uploaded file if project creation fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    next(err)
  }
}

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id)

    if (!project) {
      // Clean up uploaded file if project not found
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    const { title, description, link, tags, featured } = req.body

    let imageData = project.image
    if (req.file) {
      try {
        // Delete old image if exists
        if (project.image && project.image.public_id) {
          await deleteFromCloudinary(project.image.public_id)
        }

        const result = await uploadToCloudinary(req.file.path)
        imageData = {
          public_id: result.public_id,
          url: result.secure_url,
        }
      } catch (uploadError) {
        console.error("❌ Cloudinary upload failed:", uploadError)
        // Clean up local file if upload fails
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path)
        }
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        })
      }
    }

    // Process tags
    let processedTags = project.tags
    if (tags !== undefined) {
      if (typeof tags === "string") {
        processedTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      } else if (Array.isArray(tags)) {
        processedTags = tags
      }
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        link,
        tags: processedTags,
        featured: featured === "true" || featured === true,
        image: imageData,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (err) {
    // Clean up uploaded file if update fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    next(err)
  }
}

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    // Delete image from cloudinary if exists
    if (project.image && project.image.public_id) {
      try {
        await deleteFromCloudinary(project.image.public_id)
      } catch (deleteError) {
        console.error("❌ Failed to delete image from Cloudinary:", deleteError)
        // Continue with project deletion even if image deletion fails
      }
    }

    await Project.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      data: {},
      message: "Project deleted successfully",
    })
  } catch (err) {
    next(err)
  }
}
