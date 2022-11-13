import express from "express";
const router = express.Router();

import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import File from "../models/file.js"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/add").post(upload.single("photo"), (req, res) => {
  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const photo = req.file.filename;

  const newFileData = {
    name,
    birthdate,
    photo,
  };

  const newFile = new File(newFileData);

  newFile
    .save()
    .then(() => res.json("File Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;
