import db from "../database/database.js";

const getAllEvents = () => {
    const events = db.prepare("SELECT * FROM event").all();
    return events;
}

const createEvent = (title, description, date, time) => {
    const result = db.prepare(`
        INSERT INTO event (title, description, date, time) VALUES (?, ?, ?, ?)`).run(
            title,
            description,
            date,
            time
        );
    return result.lastInsertRowid;
};

const updateEvent = (title, description,date, time, id) => {
    const result = db.prepare(`
        UPDATE event
        SET title = ?, description = ?, date = ?, time = ?
        WHERE id = ?
    `).run(
        title,
        description,
        date,
        time,
        id
    );
     return result.changes;
};

const deleteEvent = (id) => {
    const result = db.prepare(`
        DELETE FROM event
        WHERE id = ?
    `).run(id);
    return result.changes;
};

export { getAllEvents, createEvent, updateEvent, deleteEvent };