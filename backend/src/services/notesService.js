import db from "../database/database.js";

const getAllNotes = async () => {
    const result = await db.query("SELECT * FROM notes");
    return result.rows;
};

const createNote = async (contenu) => {
    const result = await db.query(
        `INSERT INTO notes (contenu) VALUES ($1) RETURNING id`,
        [contenu]
    );
    return result.rows[0].id;
};

const updateNote = async (contenu, id) => {
    const result = await db.query(
        `UPDATE notes SET contenu = $1 WHERE id = $2`,
        [contenu, id]
    );
    return result.rowCount;
};

const deleteNote = async (id) => {
    const result = await db.query(
        `DELETE FROM notes WHERE id = $1`,
        [id]
    );
    return result.rowCount;
};

const getAllPostits = async () => {
    const result = await db.query("SELECT * FROM postit");
    return result.rows;
};

const createPostit = async (contenu, color) => {
    const result = await db.query(
        `INSERT INTO postit (contenu, color) VALUES ($1, $2) RETURNING id`,
        [contenu, color]
    );
    return result.rows[0].id;
};

const updatePostit = async (contenu, color, id) => {
    const result = await db.query(
        `UPDATE postit SET contenu = $1, color = $2 WHERE id = $3`,
        [contenu, color, id]
    );
    return result.rowCount;
};

const deletePostit = async (id) => {
    const result = await db.query(
        `DELETE FROM postit WHERE id = $1`,
        [id]
    );
    return result.rowCount;
};

export { getAllNotes, createNote, updateNote, deleteNote, getAllPostits, createPostit, updatePostit, deletePostit };
