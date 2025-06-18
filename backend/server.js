require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const logger = require("./utils/logger")
const path = require("path")
const multer = require("multer") // Import multer

const app = express()
const PORT = process.env.PORT || 5000

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001", "http://127.0.0.1:5173", "https://portfolio-dhruv557-live.onrender.com"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}

app.use(cors(corsOptions))

// Middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`)
  next()
})

// Test DB connection route
app.get("/test-db", async (req, res) => {
  try {
    const db = mongoose.connection.db
    const collection = db.collection("test")

    await collection.insertOne({
      message: "Database test successful!",
      timestamp: new Date(),
    })

    const doc = await collection.findOne({})
    res.json(doc)
  } catch (err) {
    logger.error("Database test failed", err)
    res.status(500).json({ error: err.message })
  }
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  })
})

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/messages", require("./routes/messageRoutes"))

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Error:", err)

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 10MB.",
      })
    }
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  })
})

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio")

    logger.info(`✅ MongoDB Connected to ${mongoose.connection.name}`)

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`)
      logger.info(`Database status: ${mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"}`)
      logger.info(`Database name: ${mongoose.connection.name}`)
      logger.info(`CORS enabled for origins: ${corsOptions.origin.join(", ")}`)
    })
  } catch (err) {
    logger.error("❌ Failed to connect to database", err)
    process.exit(1)
  }
}

startServer()
