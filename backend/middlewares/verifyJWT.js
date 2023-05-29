import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const verifyJWT = (req, res, next) => {
  // Get the token from the cookie
  console.log(req.url);
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key

    // Attach the decoded payload to the request object
    // console.log("decoded:", decoded);
    req.user = decoded;
    req.roles = decoded.staff_roles.map((role) => +role.role_id);

    // Call the next middleware
    next();
  } catch (error) {
    // If the token verification fails
    return res.status(403).json({ message: "Failed to authenticate token." });
  }
};
