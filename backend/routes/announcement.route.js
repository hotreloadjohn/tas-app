import express from "express";
import { getAllAnnouncements } from "../controllers/announcement.controller.js";

const router = express.Router();

router.get("/announcements", getAllAnnouncements);
// router.post("/api/announcements/", announcementController.createAnnouncement);
// router.put("/api/announcements/", announcementController.updateAnnouncement);
// router.delete(
//   "/api/announcements/",
//   announcementController.deleteAnnouncement
// );

export default router;
