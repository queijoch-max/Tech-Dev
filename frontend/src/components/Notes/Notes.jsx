import styles from "./Notes.module.css";
import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import Postits from "./Postits";

// ==============================
// COMPOSANT : NOTES
// ==============================

function Notes() {

    // ==============================
    // NOTES
    // ==============================

    const [Freetext, setFreetext] = useState("");
    const [postIts, setPostIts] = useState([]);

    const [noteId, setNoteId] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${API_URL}/notes`);

                if (!response.ok) {
                    console.error("Erreur lors de la récupération des notes :", response.status);
                    return;
                }

                const data = await response.json();

                setFreetext(data.notes[0]?.contenu || "");
                setNoteId(data.notes[0]?.id || null);

            } catch (error) {
                console.error("Erreur réseau lors de la récupération des notes :", error);
            }
        };

        fetchNotes();

    },   []);

    useEffect(() => {
        const fetchPostits = async () => {
            try {
                const response = await fetch(`${API_URL}/notes/postits`);

                if (!response.ok) {
                    console.error("Erreur lors de la récupération des postits :", response.status);
                    return;
                }

                const data = await response.json();

                setPostIts(data.postits);

            } catch (error) {
                console.error("Erreur réseau lors de la récupération des postits :", error);
            }
        };

        fetchPostits();

    }, []);     


    // ==============================
    // CRÉER UNE NOTE
    // ==============================

    const createNote = async (contenu) => {
        const response = await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contenu: contenu
            })
        });

        const data = await response.json();

        setNoteId(data.noteId);
    };

    const saveFreetext = async () => {
        if (noteId) {
            await updateNote(Freetext);
        } else {
            await createNote(Freetext);
        }
    };

    // ==============================
    // CRÉER UN POSTIT
    // ==============================

    const createPostit = async (contenu, color) => {
        const response = await fetch(`${API_URL}/notes/postits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contenu: contenu,
                color: color
            })
        });

        const data = await response.json();

        const newPostit = { id: data.postitId, contenu, color };
        setPostIts((currentPostits) => [...currentPostits, newPostit]);
    };

    // ==============================
    // MODIFIER UNE NOTE
    // ==============================

    const updateNote = async (contenu) => {
        await fetch(`${API_URL}/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contenu})
        });
    };

    // ==============================
    // MODIFIER UN POSTIT
    // ==============================

    const updatePostit = async (id, contenu, color) => {
        await fetch(`${API_URL}/notes/postits/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contenu,color})
        });

        setPostIts((currentPostits) =>
            currentPostits.map((postit) =>
                postit.id ===id ?{...postit, contenu, color} : postit
            )
        );
    };

    // ==============================
    // SUPPRIMER UN POSTIT
    // ==============================

    const deletePostit = async (id) => {
        await fetch(`${API_URL}/notes/postits/${id}`, {
            method: "DELETE"
        });

        setPostIts((currentPostits) => currentPostits.filter((postit) => postit.id !== id));
    };

    // ==============================
    // AFFICHAGE
    // ==============================

return (
    <div className={styles.notes}>

        <textarea
            className={styles.freeText}
            value={Freetext}
            onChange={(event) => setFreetext(event.target.value)}
            onBlur={saveFreetext}
            placeholder="Écris librement ici..."
        />

        <Postits
            postIts={postIts}
            onAddPostit={createPostit}
            onUpdatePostit={updatePostit}
            onDeletePostit={deletePostit}
        />

    </div>
);

}
export default Notes;