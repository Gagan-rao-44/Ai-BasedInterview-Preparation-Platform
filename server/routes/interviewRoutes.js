import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createInterview,
  getInterview,
  submitInterview,
  getUserInterviews,
  getDashboardStats,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  createInterview
);

router.get(
  "/history",
  protect,
  getUserInterviews
);

router.get(
  "/stats/dashboard",
  protect,
  getDashboardStats
);

router.get(
  "/:id",
  protect,
  getInterview
);

router.put(
  "/submit/:id",
  protect,
  submitInterview
);

export default router;