const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const totalApplications = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM applications
        WHERE user_id = $1
        `,
        [userId]
    );

    const totalOffers = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM applications
        WHERE user_id = $1
        AND status = 'Selected'
        `,
        [userId]
    );

    const totalRejections = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM applications
        WHERE user_id = $1
        AND status = 'Rejected'
        `,
        [userId]
    );

    const totalInterviews = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM applications
        WHERE user_id = $1
        AND status = 'Interview Scheduled'
        `,
        [userId]
    );

    const statusCounts = await pool.query(
        `
        SELECT
            status,
            COUNT(*) AS count
        FROM applications
        WHERE user_id = $1
        GROUP BY status
        `,
        [userId]
    );

    res.send({
        totalApplications:
            Number(totalApplications.rows[0].total),

        totalOffers:
            Number(totalOffers.rows[0].total),

        totalRejections:
            Number(totalRejections.rows[0].total),

        totalInterviews:
            Number(totalInterviews.rows[0].total),

        statusSummary:
            statusCounts.rows
    });

});

module.exports = {
    getDashboardStats
};