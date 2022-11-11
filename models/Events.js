import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: [true, "Please provide course"],
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["planned", "ongoing", "completed"],
      default: "planned",
    },
    projectType: {
      type: String,
      enum: ["Web development", "IoT", "AI-ML", "Blockchain"],
      default: "Web development",
    },
    eventLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Club",
      required: [true, "Please provide club"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Events", EventSchema);
