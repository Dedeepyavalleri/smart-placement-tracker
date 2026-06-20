const express = require("express");

const router = express.Router();

const authMiddleware =require("../middleware/authMiddleware");

const {
    getApplications,
    addApplication,
    getApplicationById,
    updateApplication,
    deleteApplication
} = require("../controllers/applicationController");

router.get("/applications",authMiddleware, getApplications);

router.post("/applications",authMiddleware,addApplication);

router.get("/applications/:id",authMiddleware,getApplicationById);

router.put("/applications/:id",authMiddleware,updateApplication);

router.delete("/applications/:id",authMiddleware,deleteApplication)

module.exports = router;