import mongoose from "mongoose";

const ProjectClubSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
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
    projectLocation: {
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

export default mongoose.model("ProjectsClub", ProjectClubSchema);
