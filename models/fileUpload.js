import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageUpload = new Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("imageUpload", ImageUpload);
