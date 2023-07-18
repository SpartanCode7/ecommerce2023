const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Admin login controllerw
const adminLogin = async (req, res) => {
  // Retrieve username and password from request body
  const { username, password } = req.body;

  // Check if username and password match
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};

module.exports = {
  adminLogin,
};
