import {
    getAllNotes,
    createNote as createNoteService,
    updateNote as updateNoteService,
    deleteNote as deleteNoteService,
    getAllPostits,
    createPostit as createPostitService,
    updatePostit as updatePostitService,
    deletePostit as deletePostitService
} from "../services/notesService.js";

const getNotes = async (req, res) => {
    const notes = await getAllNotes();

    res.json({
        message: "Liste des notes",
        notes: notes
    });
};

const createNote = async (req, res) => {
    const { contenu } = req.body;

    const noteId = await createNoteService(
        contenu
    );

    res.status(201).json({
        message: "Note ajouté avec succès",
        noteId: noteId
    });
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { contenu } = req.body;

    const result = await updateNoteService(
        contenu,
        id
    );

    res.json({
        message: "Note modifié avec succès",
        changes: result
    });
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    const result = await deleteNoteService(id);

    res.json({
        message: "Note supprimé avec succès",
        changes: result
    });
};

const getPostits = async (req, res) => {
    const postits = await getAllPostits();

    res.json({
        message: "Liste des postits",
        postits: postits
    });
};

const createPostit = async (req, res) => {
    const { contenu, color } = req.body;

    const postitId = await createPostitService(
        contenu,
        color
    );

    res.status(201).json({
        message: "Postit ajouté avec succès",
        postitId: postitId
    });
};

const updatePostit = async (req, res) => {
    const { id } = req.params;
    const { contenu, color } = req.body;

    const result = await updatePostitService(
        contenu,
        color,
        id
    );

    res.json({
        message: "Postit modifié avec succès",
        changes: result
    });
};

const deletePostit = async (req, res) => {
    const { id } = req.params;
    const result = await deletePostitService(id);

    res.json({
        message: "Postit supprimé avec succès",
        changes: result
    });
};

export {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getPostits,
    createPostit,
    updatePostit,
    deletePostit
};