const pool = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

const getNotes = asyncHandler(async (req, res) => {

    const result = await pool.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = $1
        ORDER BY id
        `,
        [req.user.id]
    );

    res.send(result.rows);

});

const addNotes = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const {
        title,
        content
    } = req.body;

    const result = await pool.query(
        `
        INSERT INTO notes
        (
            user_id,
            title,
            content
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
            title,
            content
        ]
    );

    res.send({
        message: "Note Added",
        note: result.rows[0]
    });

});

const getNotesById = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result = await pool.query(
        `
        SELECT *
        FROM notes
        WHERE id = $1
        AND user_id = $2
        `,
        [id, req.user.id]
    );

    if (result.rows.length === 0) {

        res.status(404);
        throw new Error("Note not found");

    }

    res.send(result.rows[0]);

});

const updateNotes = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const {
        title,
        content
    } = req.body;

    const result = await pool.query(
        `
        UPDATE notes
        SET
            title = $1,
            content = $2
        WHERE id = $3
        AND user_id = $4
        RETURNING *
        `,
        [
            title,
            content,
            id,
            req.user.id
        ]
    );

    if (result.rows.length === 0) {

        res.status(404);
        throw new Error("Note not found");

    }

    res.send({
        message: "Note updated successfully",
        note: result.rows[0]
    });

});

const deleteNotes = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const result = await pool.query(
        `
        DELETE FROM notes
        WHERE id = $1
        AND user_id = $2
        RETURNING *
        `,
        [id, req.user.id]
    );

    if (result.rows.length === 0) {

        res.status(404);
        throw new Error("Note not found");

    }

    res.send({
        message: "Note deleted successfully",
        note: result.rows[0]
    });

});

module.exports = {
    getNotes,
    addNotes,
    getNotesById,
    updateNotes,
    deleteNotes
};