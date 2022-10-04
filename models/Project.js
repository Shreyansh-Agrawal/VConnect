import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
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
    projectLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema)
