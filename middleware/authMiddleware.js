// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from headers, query, cookies, etc.
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, access denied" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "jwt12secret"); // Replace with your secret key

    // Attach the decoded user information to the request object for later use if needed
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};

module.exports = authMiddleware;
