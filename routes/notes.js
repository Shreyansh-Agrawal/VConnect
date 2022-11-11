import express from "express";
const router = express.Router();

import {
  getAllNotes,
  postCreateNotes,
  putUpdateNotes,
  deleteNotes,
} from "../controllers/notes.js"

router.get("/", getAllNotes);

router.post("/", postCreateNotes);

router.put("/:id", putUpdateNotes);

router.delete("/:id", deleteNotes);

export default router;
