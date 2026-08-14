import db from "../database/database.js";

const getAllProjects = () => {
    const projects = db.prepare("SELECT * FROM project").all();
    return projects;
}

const createProject = (name, description, status, progress, deadline) => {
    const result = db.prepare(`
        INSERT INTO project (name, description, status, progress, deadline) VALUES (?, ?, ?, ?, ?)`).run(name, description, status, progress, deadline);
    return result.lastInsertRowid;
}

const updateProject = (name, description, status, progress, deadline, id) => {
    const result = db.prepare(`
        UPDATE project 
        SET name = ?, description = ?, status = ?, progress = ?, deadline = ?
        WHERE id = ?
    `).run(name, description, status, progress, deadline, id);
    return result.changes;
}

const deleteProject = (id) => {
    const result = db.prepare(`
        DELETE FROM project
        WHERE id = ?
    `).run(id);
    return result.changes;
}

export { getAllProjects, createProject, updateProject, deleteProject };