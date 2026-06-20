const express = require("express");

const router = express.Router();

const authMiddleware =require("../middleware/authMiddleware");

const {
    getCompanies,
    addCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

router.get("/companies",authMiddleware, getCompanies);

router.post("/companies", authMiddleware,addCompany);

router.get("/companies/:id", authMiddleware,getCompanyById);

router.put("/companies/:id", authMiddleware,updateCompany);

router.delete("/companies/:id", authMiddleware,deleteCompany)

module.exports = router;