require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("../src/routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("./config/db_connection");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

module.exports = app;