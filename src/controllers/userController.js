const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
} = require("../constant/httpCode");


//User-login Controller
const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    try {
      // Validate user input
      if (!(email && password)) {
        throw new Error("All input is required");
      }

      // Validate if user exists in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // Send the response
        return res.status(OK).json(user);
      }

      // Invalid credentials
      throw new Error("Invalid Credentials");
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).send(err.message);
    }
  } catch (err) {
    console.log(err);
    return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

//User-Register Controller
const register = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    try {
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        throw new Error("All input is required");
      }

      // Check if user already exists
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exists. Please Login");
      }

      // Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // Save user token
      user.token = token;

      // Return new user
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(BAD_REQUEST).send(err.message);
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
  // Our register logic ends here
};

module.exports = {
    login,
    register
}
