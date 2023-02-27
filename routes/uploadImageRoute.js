import express from "express";
const ImageUploadRouter = express.Router();

// const ImageUploadRouter = require("express").Router();

// const { UploadImage } = require("../controller/uploadImage");

import UploadImage from "../controllers/uploadImage.js"

import parser from "../middleware/cloudinary.config.js"

ImageUploadRouter.post("/image", parser.single("image"), UploadImage);

export default ImageUploadRouter;
