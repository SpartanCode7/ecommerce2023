const express = require("express");
const bodyParser = require("body-parser");
// const adminRoutes = require("../src/routes/adminRoutes");
// const userRoutes = require("./routes/userRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
// app.use("/admin", adminRoutes);
// app.use("/user", userRoutes);
// app.use("/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

module.exports = app;