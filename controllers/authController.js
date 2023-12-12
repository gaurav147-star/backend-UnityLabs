const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretkey = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, jwtSecretkey, { expiresIn: "1d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" }); // Send error response and return to avoid further execution
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    }); // Use 'User.create' to create a new user
    if (!user) {
      return res.status(500).json({ error: "User creation failed" }); // Handle user creation failure
    }
    const token = generateToken(user._id);
    res.json({ id: user._id, name, email, token, userType });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
      userType: user.userType,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };
