import express from 'express'
const router = express.Router()

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  showStats,
  createProjectClub,
  deleteProjectClub,
  getAllProjectsClub,
  updateProjectClub,
  showStatsClub,
} from "../controllers/projectsController.js";

router.route('/').post(createProject).get(getAllProjects)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteProject).patch(updateProject)

router.route("/club").post(createProjectClub).get(getAllProjectsClub);
// remember about :id
router.route("/stats-club").get(showStatsClub);
router.route("/:id").delete(deleteProjectClub).patch(updateProjectClub);

export default router
