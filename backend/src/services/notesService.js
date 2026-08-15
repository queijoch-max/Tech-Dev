import db from "../database/database.js";

const getAllNotes = () => {
    const notes = db.prepare("SELECT * FROM notes").all();
    return notes;
}

const createNote = (contenu) => {
    const result = db.prepare(`
        INSERT INTO notes (contenu) VALUES (?)`).run(
            contenu
        );
    return result.lastInsertRowid;
};

const updateNote = (contenu, id) => {
    const result = db.prepare(`
        UPDATE notes
        SET contenu = ?
        WHERE id = ?
    `).run(
        contenu,
        id
    );
     return result.changes;
};

const deleteNote = (id) => {
    const result = db.prepare(`
        DELETE FROM notes
        WHERE id = ?
    `).run(id);
    return result.changes;
};

const getAllPostits = () => {
    const postits = db.prepare("SELECT * FROM postIt").all();
    return postits;
}

const createPostit = (contenu, color) => {
    const result = db.prepare(`
        INSERT INTO postIt (contenu, color) VALUES (?, ?)`).run(
            contenu,
            color
        );
    return result.lastInsertRowid;
};

const updatePostit = (contenu, color, id) => {
    const result = db.prepare(`
        UPDATE postIt
        SET contenu = ?, color = ?
        WHERE id = ?
    `).run(
        contenu,
        color,
        id
    );
     return result.changes;
};

const deletePostit = (id) => {
    const result = db.prepare(`
        DELETE FROM postIt
        WHERE id = ?
    `).run(id);
    return result.changes;
};  

export { getAllNotes, createNote, updateNote, deleteNote, getAllPostits, createPostit, updatePostit, deletePostit };