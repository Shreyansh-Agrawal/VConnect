import express from "express";
const router = express.Router();

import {
  createProjectClub,
  deleteProjectClub,
  getAllProjectsClub,
  updateProjectClub,
  showStatsClub,
} from "../controllers/projectsController.js";

router.route("/club").post(createProjectClub).get(getAllProjectsClub);
// remember about :id
router.route("/stats-club").get(showStatsClub);
router.route("/:id").delete(deleteProjectClub).patch(updateProjectClub);

export default router;
