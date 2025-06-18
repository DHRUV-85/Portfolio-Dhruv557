const cloudinary = require("cloudinary").v2
const fs = require("fs")

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    console.log("📤 Uploading file to Cloudinary:", filePath)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "portfolio",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: "auto",
    })

    console.log("✅ Cloudinary upload successful:", result.public_id)

    // Delete file from server after successful upload
    fs.unlinkSync(filePath)
    console.log("🗑️ Local file deleted:", filePath)

    return result
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error)

    // Delete file from server if error occurs
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log("🗑️ Local file deleted after error:", filePath)
    }
    throw error
  }
}

// Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    console.log("🗑️ Deleting from Cloudinary:", publicId)
    const result = await cloudinary.uploader.destroy(publicId)
    console.log("✅ Cloudinary deletion result:", result)
    return result
  } catch (error) {
    console.error("❌ Cloudinary deletion error:", error)
    throw error
  }
}

module.exports = { uploadToCloudinary, deleteFromCloudinary }
