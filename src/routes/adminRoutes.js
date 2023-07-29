const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

// Admin Login
router.get("/", adminController.adminLogin)

module.exports = router