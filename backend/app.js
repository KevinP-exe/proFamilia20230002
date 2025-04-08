import express from "express";
import cookieParser from "cookie-parser";
import doctorsRoutes from "./src/routes/doctors.js";
import patientsRoutes from "./src/routes/patients.js";
import datesRoutes from "./src/routes/dates.js"
import registerDoctorsRoutes from "./src/routes/registerDoctors.js";
import registerPatientsRoutes from "./src/routes/registerPatients.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/dates", datesRoutes)
app.use("/api/registerDoctors", registerDoctorsRoutes)
app.use("/api/registerPatients", registerPatientsRoutes)

export default app;