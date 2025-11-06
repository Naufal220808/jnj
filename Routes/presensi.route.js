import express from "express";
import {
    getAttendanceSummary,
    analysisAttendance
} from "../Controllers/presensi.controller.js";

const app = express();

app.get("/summary/:userId", getAttendanceSummary)
app.get("/analysis", analysisAttendance);

export default app;