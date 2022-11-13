import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  photo: {
    type: String,
  },

  birthdate: {
    type: String,
  },
});

export default mongoose.model("file", FileSchema);
