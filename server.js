import express from "express";
import cors from "cors";
import trends from "./api/routes/trends.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v2/trends", trends);
app.use("*", (req, res) => res.status(404).json({ error: "Route not found." }));

export default app;
