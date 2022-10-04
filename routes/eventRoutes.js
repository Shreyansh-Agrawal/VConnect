import express from "express";
const router = express.Router();

import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  showStatsClub,
} from "../controllers/projectsController.js";

router.route("/club").post(createEvent).get(getAllEvents);
// remember about :id
router.route("/stats-club").get(showStatsClub);
router.route("/:id").delete(deleteEvent).patch(updateEvent);

export default router;
