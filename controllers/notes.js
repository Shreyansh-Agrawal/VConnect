import Notes from "../models/notes.js";

const getAllNotes = (req, res) => {
  Notes.find()
    .then((notes) => res.json(notes))
    .catch((err) =>
      res.status(404).json({ message: "Notes not found", error: err.message })
    );
};

const postCreateNotes = (req, res) => {
  Notes.create(req.body)
    .then((data) => res.json({ message: "Notes added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add notes", error: err.message })
    );
};

const putUpdateNotes = (req, res) => {
  Notes.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update notes", error: err.message })
    );
};

const deleteNotes = (req, res) => {
  Notes.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "notes deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};

export {getAllNotes, postCreateNotes, putUpdateNotes, deleteNotes};