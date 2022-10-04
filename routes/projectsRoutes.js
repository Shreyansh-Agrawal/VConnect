import express from 'express'
const router = express.Router()

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  showStats,
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  showStatsClub,
} from "../controllers/projectsController.js";

router.route('/').post(createProject).get(getAllProjects)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteProject).patch(updateProject)

router.route("/club").post(createEvent).get(getAllEvents);
// remember about :id
router.route("/stats-club").get(showStatsClub);
router.route("/:id").delete(deleteEvent).patch(updateEvent);

export default router
