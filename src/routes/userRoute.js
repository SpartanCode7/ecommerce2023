const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// Get user login
router.get("/login", userController.login)

// Register user
router.post("/register", userController.register)

module.exports = router