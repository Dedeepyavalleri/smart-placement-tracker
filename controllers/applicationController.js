const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

const getApplications = asyncHandler(async (req, res) => {

    const userId = req.user.id;
    const status = req.query.status || "";
    const company =req.query.company || "";

    const result = await pool.query(
    `
    SELECT
        a.id,
        u.name,
        c.company_name,
        a.status,
        a.applied_date
    FROM applications a
    JOIN users u
        ON a.user_id = u.id
    JOIN companies c
        ON a.company_id = c.id
    WHERE a.user_id = $1
    AND a.status ILIKE $2
    AND c.company_name ILIKE $3
    ORDER BY a.id
    `,
    [
        userId,
        `%${status}%`,
        `%${company}%`
    ]
    );

    res.send(result.rows);

});
const getApplicationById = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;

    const result = await pool.query(
        `
        SELECT
            a.id,
            u.name,
            c.company_name,
            a.status,
            a.applied_date
        FROM applications a
        JOIN users u
            ON a.user_id = u.id
        JOIN companies c
            ON a.company_id = c.id
        WHERE a.id = $1
        AND a.user_id = $2
        `,
        [id, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("Application not found");
    }

    res.send(result.rows[0]);

});

const addApplication = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const {
        company_id,
        status
    } = req.body;

    const validStatuses = [
        "Applied",
        "OA Cleared",
        "Interview Scheduled",
        "Rejected",
        "Selected"
    ];

    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error("Invalid status");
    }

    const result = await pool.query(
        `
        INSERT INTO applications
        (
            user_id,
            company_id,
            status
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING *
        `,
        [
            userId,
            company_id,
            status
        ]
    );

    res.send({
        message: "Application Added",
        application: result.rows[0]
    });

});

const updateApplication = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;

    const { status } = req.body;

    const result = await pool.query(
        `
        UPDATE applications
        SET status = $1
        WHERE id = $2
        AND user_id = $3
        RETURNING *
        `,
        [status, id, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("Application not found");
    }

    res.send({
        message: "Application Updated",
        application: result.rows[0]
    });

});

const deleteApplication = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const userId = req.user.id;

    const result = await pool.query(
        `
        DELETE FROM applications
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [id, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("Application not found");
    }

    res.send({
        message: "Application Deleted",
        application: result.rows[0]
    });

});

module.exports = {
    getApplications,
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplication
};