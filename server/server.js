import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());



// ROUTES
app.use("/api/auth", authRoutes);
app.use(
  "/api/interview",
  interviewRoutes
);
app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.get("/", (req, res) => {
  res.send("API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});