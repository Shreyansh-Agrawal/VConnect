// models/notes.js
import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
});

export default mongoose.model("notes", NotesSchema);