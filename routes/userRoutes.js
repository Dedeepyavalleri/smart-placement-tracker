const express = require("express");

const router = express.Router();

const authMiddleware =require("../middleware/authMiddleware");

const {
    getUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getProfile
} = require("../controllers/userController");

router.get("/users", authMiddleware,getUsers);

router.get("/users/:id",authMiddleware, getUserById);

router.post("/register", registerUser);

router.put("/users/:id", authMiddleware,updateUser);

router.delete("/users/:id", authMiddleware,deleteUser);

router.post("/login", loginUser);

router.get("/profile",authMiddleware,getProfile);

module.exports = router;
