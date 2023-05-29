import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import navbarRoutes from "./routes/navbar.route.js";
import semesterRoutes from "./routes/semester.route.js";
import annoucementRoutes from "./routes/announcement.route.js";
import coursesRoutes from "./routes/course.route.js";
import uploadRoutes from "./routes/upload.route.js";

import { verifyJWT } from "./middlewares/verifyJWT.js";
import xlsx from "xlsx";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
// built-in & lib middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    // Load the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);

    let jsonData = [];
    for (let index = 0; index < 3; index++) {
      // Assuming the first sheet is the one to parse
      const worksheet = workbook.Sheets[workbook.SheetNames[index]];

      // Convert the worksheet data to JSON
      let jsonDataTmp = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      jsonData = [...jsonData, jsonDataTmp];
    }

    // Send the JSON data in the response
    res.json({ result: jsonData });
  } catch (error) {
    // Handle any errors that occur during file parsing
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while parsing the file." });
  }
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// auth routes
app.use("/api/auth", authRoutes);
app.use("/", navbarRoutes); // TODO: +api make this consistent in frontend +verify jwt

app.use(verifyJWT); // all routes below this line will require jwt token
app.use("/api/semester", semesterRoutes);
app.use("/api/report", semesterRoutes); //TODO: to remove after changing prefix in frontend
app.use("/api", annoucementRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/upload", uploadRoutes);

// catch all * not found routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
