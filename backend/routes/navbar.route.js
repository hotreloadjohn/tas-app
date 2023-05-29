import express from "express";
import { getNavByRole } from "../controllers/navbar.controller.js";

const router = express.Router();

router.post("/navbar", getNavByRole);

export default router;
