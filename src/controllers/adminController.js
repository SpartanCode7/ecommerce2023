const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Admin");

// Admin login controllerw
const adminLogin = async (req, res) => {
  // Retrieve email and password from request body
  const { email, password } = req.body;

  // Check if email and password match
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};

module.exports = {
  adminLogin,
};
