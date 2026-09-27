import db from "../database/database.js";

const getAllTasks = async () => {
    const result = await db.query("SELECT * FROM task");
    return result.rows;
};

const createTask = async (title, description, status, period) => {
    const result = await db.query(
        `INSERT INTO task (title, description, status, period) VALUES ($1, $2, $3, $4) RETURNING id`,
        [title, description, status, period]
    );
    return result.rows[0].id;
};

const updateTask = async (title, description, status, period, id) => {
    const result = await db.query(
        `UPDATE task
        SET title = $1, description = $2, status = $3, period = $4
        WHERE id = $5`,
        [title, description, status, period, id]
    );
    return result.rowCount;
};

const deleteTask = async (id) => {
    const result = await db.query(
        `DELETE FROM task WHERE id = $1`,
        [id]
    );
    return result.rowCount;
};

export { getAllTasks, createTask, updateTask, deleteTask };
