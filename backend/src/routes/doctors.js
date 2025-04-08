import express from "express";
import doctorsController from "../controllers/doctorsController.js";
 
const router = express.Router();
 
router
  .route("/")
  .get(doctorsController.getDoctors)
  .post(doctorsController.insertDoctor);
 
router
  .route("/:id")
  .put(doctorsController.updateDoctor)
  .delete(doctorsController.deleteDoctor);
 
export default router;