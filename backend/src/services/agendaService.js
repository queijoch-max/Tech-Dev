import db from "../database/database.js";

const getAllEvents = async () => {
    const result = await db.query("SELECT * FROM event");
    return result.rows;
};

const createEvent = async (title, description, date, time) => {
    const result = await db.query(
        `INSERT INTO event (title, description, date, time) VALUES ($1, $2, $3, $4) RETURNING id`,
        [title, description, date, time]
    );
    return result.rows[0].id;
};

const updateEvent = async (title, description, date, time, id) => {
    const result = await db.query(
        `UPDATE event
        SET title = $1, description = $2, date = $3, time = $4
        WHERE id = $5`,
        [title, description, date, time, id]
    );
    return result.rowCount;
};

const deleteEvent = async (id) => {
    const result = await db.query(
        `DELETE FROM event WHERE id = $1`,
        [id]
    );
    return result.rowCount;
};

export { getAllEvents, createEvent, updateEvent, deleteEvent };
