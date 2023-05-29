import express from "express";
import { getAllCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
// router.get("/api/course/", courseController.getAllCoursesByStatus);
// router.post("/api/course/", courseController.createCourse);
// router.put("/api/course/", courseController.updateCourse);
// router.put("/api/course/disable", courseController.disableCourse);
// router.put("/api/course/enable", courseController.enableCourse);
// router.delete("/api/course/", courseController.deleteCourse);

export default router;
