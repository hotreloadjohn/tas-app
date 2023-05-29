import {
  checkIfUserExists,
  createUser,
  getStaffInfo,
} from "../services/auth.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;
    if (!email || !password || !username || !name)
      throw new Error("Missing fields");
    // check if user exists
    if (await checkIfUserExists(email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // insert user into db
    await createUser(email, hashedPassword, username, name);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    const errorMsg = error.message ? error.message : "Something went wrong";
    res.status(500).json({ message: errorMsg });
  }
};

export const login = async (req, res) => {
  // check if user exists via email
  const { staffid, password } = req.body;

  const staffData = await getStaffInfo(staffid);

  if (!staffData)
    return res.status(404).json({ message: "Staff does not exist" });
  // check if password matches
  const isMatch = await bcrypt.compare(password, staffData.staff_password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // create jwt token
  const token = jwt.sign(
    {
      staff_name: staffData.staff_name,
      staff_id: staffData.staff_id,
      staff_roles: staffData.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const { staff_password, ...rest } = staffData;

  // send token in cookie
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ result: rest }); // [] because of frontend
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({ message: "Logged out" });
};
