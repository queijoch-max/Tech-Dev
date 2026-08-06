import db from "../database/database.js";

const getAllTasks = () => {
    const tasks = db.prepare("SELECT * FROM task").all();
    return tasks;
}   

const createTask = (title, description, status, period) => {
    const result = db.prepare(`
        INSERT INTO task (title, description, status, period) VALUES (?, ?, ?, ?)`).run(
            title,
            description,
            status,
            period
        );
    return result.lastInsertRowid;
};

const updateTask = (title, description, status, period, id) => {
    const result = db.prepare(`
        UPDATE task
        SET title = ?, description = ?, status = ?, period = ?
        WHERE id = ?
    `).run(
        title,
        description,
        status,
        period,
        id
    );
     return result.changes;
};

const deleteTask = (id) => {
    const result = db.prepare(`
        DELETE FROM task
        WHERE id = ?
    `).run(id);
    return result.changes;
};

export { getAllTasks, createTask, updateTask, deleteTask };