const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const JWT_SECRET = require("../config/auth");
const asyncHandler = require("../utils/asyncHandler");

const getUsers = asyncHandler(async (req, res) => {

    const result = await pool.query(
        "SELECT * FROM users"
    );

    res.send(result.rows);

});

const getUserById = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    res.send(result.rows[0]);

});

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).send({
            message: "Name is required"
        });
    }

    if (!email) {
        return res.status(400).send({
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(400).send({
            message: "Password is required"
        });
    }

    if (password.length < 6) {
        return res.status(400).send({
            message: "Password must be at least 6 characters"
        });
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send({
            message: "Invalid email format"
        });
    }

    const existingUser =
        await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        );

    if (existingUser.rows.length > 0) {
        return res.status(400).send({
            message: "Email already exists"
        });
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users
        (name,email,password)
        VALUES
        ($1,$2,$3)
        RETURNING *
        `,
        [name, email, hashedPassword]
    );

    res.send({
        message: "User Registered Successfully",
        user: result.rows[0]
    });

});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(404).send({
            message: "User not found"
        });
    }

    const user = result.rows[0];

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        return res.status(401).send({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.send({
        message: "Login Successful",
        token
    });

});

const updateUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const { name, email } = req.body;

    const result = await pool.query(
        `
        UPDATE users
        SET name = $1,
            email = $2
        WHERE id = $3
        RETURNING *
        `,
        [name, email, id]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    res.send({
        message: "User updated",
        user: result.rows[0]
    });

});

const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result = await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    res.send({
        message: "User deleted successfully",
        user: result.rows[0]
    });

});

const getProfile = asyncHandler(async (req, res) => {

    res.send({
        message: "Protected Route Accessed",
        user: req.user
    });

});

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getProfile
};