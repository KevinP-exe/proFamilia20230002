import express from "express";
import datesController from "../controllers/datesController.js";
 
const router = express.Router();
 
router
  .route("/")
  .get(datesController.getDates)
  .post(datesController.insertDate);
 
router
  .route("/:id")
  .put(datesController.updateDate)
  .delete(datesController.deleteDate);
 
export default router;