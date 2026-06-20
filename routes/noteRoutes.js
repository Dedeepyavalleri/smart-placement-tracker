const express = require("express");
const router = express.Router();
const authMiddleware =require("../middleware/authMiddleware");
const {
    getNotes,
    addNotes,
    getNotesById,
    updateNotes,
    deleteNotes
} = require("../controllers/noteController");
router.get("/notes",authMiddleware, getNotes);
router.post("/notes", authMiddleware, addNotes);
router.get("/notes/:id",authMiddleware, getNotesById);
router.put("/notes/:id",authMiddleware, updateNotes);
router.delete("/notes/:id",authMiddleware, deleteNotes);
module.exports = router;