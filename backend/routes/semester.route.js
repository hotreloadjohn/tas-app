import express from "express";
import {
  getAllSemesters,
  getAllSemestersByStatus,
} from "../controllers/semester.controller.js";

const router = express.Router();

router.get("/", getAllSemestersByStatus);
router.get("/semester/", getAllSemesters); // TODO: rename this enpoint in FE and here to be consistent
// router.post("/api/semester/", createSemester);
// router.put("/api/semester/", updateSemester);
// router.put("/api/semester/disable", disableSemester);
// router.put("/api/semester/enable", enableSemester);
// router.delete("/api/semester/", deleteSemester);

export default router;
