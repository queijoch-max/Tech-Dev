import db from "../database/database.js";

const getAllProjects = async () => {
    const result = await db.query("SELECT * FROM project");
    return result.rows;
};

const createProject = async (name, description, status, progress, deadline) => {
    const result = await db.query(
        `INSERT INTO project (name, description, status, progress, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [name, description, status, progress, deadline]
    );
    return result.rows[0].id;
};

const updateProject = async (name, description, status, progress, deadline, id) => {
    const result = await db.query(
        `UPDATE project
        SET name = $1, description = $2, status = $3, progress = $4, deadline = $5
        WHERE id = $6`,
        [name, description, status, progress, deadline, id]
    );
    return result.rowCount;
};

const deleteProject = async (id) => {
    const result = await db.query(
        `DELETE FROM project WHERE id = $1`,
        [id]
    );
    return result.rowCount;
};

export { getAllProjects, createProject, updateProject, deleteProject };
