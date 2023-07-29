import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
    createdBy:{
        type: "String",
    },
    madeBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("notes", NotesSchema);