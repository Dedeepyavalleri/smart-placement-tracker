const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

const getCompanies = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const search = req.query.search || "";

    const sort = req.query.sort || "asc";

    if (
        sort !== "asc" &&
        sort !== "desc"
    ) {
        res.status(400);
        throw new Error(
            "Sort must be asc or desc"
        );
    }

    const sortOrder =
        sort === "asc"
            ? "ASC"
            : "DESC";

    let result;

    if (search) {

        result = await pool.query(
            `
            SELECT *
            FROM companies
            WHERE user_id = $1
            AND company_name ILIKE $2
            ORDER BY company_name ${sortOrder}
            LIMIT $3
            OFFSET $4
            `,
            [
                req.user.id,
                `%${search}%`,
                limit,
                offset
            ]
        );

    } else {

        result = await pool.query(
            `
            SELECT *
            FROM companies
            WHERE user_id = $1
            ORDER BY company_name ${sortOrder}
            LIMIT $2
            OFFSET $3
            `,
            [
                req.user.id,
                limit,
                offset
            ]
        );

    }

    const totalResult =
        await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM companies
            WHERE user_id = $1
            AND company_name ILIKE $2
            `,
            [
                req.user.id,
                `%${search}%`
            ]
        );

    res.send({
        page,
        limit,
        search,
        sort,
        total: totalResult.rows[0].total,
        companies: result.rows
    });

});

const addCompany = asyncHandler(async (req, res) => {

    const {
        company_name,
        role,
        package,
        deadline
    } = req.body;

    if (!company_name) {
        res.status(400);
        throw new Error(
            "Company name required"
        );
    }

    if (!role) {
        res.status(400);
        throw new Error(
            "Role required"
        );
    }

    const result =
        await pool.query(
            `
            INSERT INTO companies
            (
                company_name,
                role,
                package,
                deadline,
                user_id
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING *
            `,
            [
                company_name,
                role,
                package,
                deadline,
                req.user.id
            ]
        );

    res.send({
        message: "Company Added",
        company: result.rows[0]
    });

});

const getCompanyById = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result =
        await pool.query(
            `
            SELECT *
            FROM companies
            WHERE id = $1
            AND user_id = $2
            `,
            [
                id,
                req.user.id
            ]
        );

    if (result.rows.length === 0) {

        res.status(404);

        throw new Error(
            "Company not found"
        );

    }

    res.send(result.rows[0]);

});

const updateCompany = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const {
        company_name,
        role,
        package,
        deadline
    } = req.body;

    const result =
        await pool.query(
            `
            UPDATE companies
            SET
                company_name = $1,
                role = $2,
                package = $3,
                deadline = $4
            WHERE id = $5
            AND user_id = $6
            RETURNING *
            `,
            [
                company_name,
                role,
                package,
                deadline,
                id,
                req.user.id
            ]
        );

    if (result.rows.length === 0) {

        res.status(404);

        throw new Error(
            "Company not found"
        );

    }

    res.send({
        message: "Company Updated",
        company: result.rows[0]
    });

});

const deleteCompany = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result =
        await pool.query(
            `
            DELETE FROM companies
            WHERE id = $1
            AND user_id = $2
            RETURNING *
            `,
            [
                id,
                req.user.id
            ]
        );

    if (result.rows.length === 0) {

        res.status(404);

        throw new Error(
            "Company not found"
        );

    }

    res.send({
        message:
            "Company deleted successfully",
        company: result.rows[0]
    });

});

module.exports = {
    getCompanies,
    addCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
};