import styles from "./Notes.module.css";
import { useState, } from "react";

// ==============================
// COMPOSANT : POSTIT
// ==============================

function Postits({ postIts, onAddPostit, onUpdatePostit, onDeletePostit }) {

const COLORS = ["yellow", "orange", "red", "green"];

const [newContent, setNewContent] = useState("");
const [newColor, setNewColor] = useState(null);

const [editingPostitId, setEditingPostitId] = useState(null);
const [editContent, setEditContent] = useState("");
const [editColor, setEditColor] = useState(null);

// ==============================
// CRÉER UN POSTIT
// ==============================

const addPostit = () => {
    const content = newContent.trim();
    if (!content) return;

    onAddPostit?.(content, newColor);

    setNewContent("");
    setNewColor(null);
};

// ==============================
// SAUVEGARDER UN POSTIT
// ==============================

const startEditingPostit = (postit) => {
    setEditingPostitId(postit.id);
    setEditContent(postit.contenu);
    setEditColor(postit.color);
};

const saveEditingPostit = (postit) => {
    onUpdatePostit?.(postit.id, editContent, editColor);
    setEditingPostitId(null);
};

const handleEditKeyDown = (e, postit) => {
    if (e.key === "Enter") {
        e.preventDefault();
        saveEditingPostit(postit);
    }
};

// ==============================
// SUPPRIMER UN POSTIT
// ==============================

const deletePostit = (id) => {
    onDeletePostit?.(id);
};

// ==============================
// AFFICHAGE
// ==============================

return (
    <div className={styles.postIts}>

        <div className={styles.postItsHeader}>
            <h3>Post-Its</h3>
            <input type="text" value={newContent} onChange={(event) => setNewContent(event.target.value)} onKeyDown={(e) => e.key === "Enter" && addPostit()} placeholder="Ajouter un contenu..." />
                
            <button type="button" onClick={addPostit}>
                Ajouter
            </button>
        </div>
        <div className={styles.colorPicker}>
            {COLORS.map((color) => (
                <button
                key={color}
                type="button"
                className={color === newColor ? styles.colorSelected : styles.colorButton}
                style={{ backgroundColor: color }}
                onClick={() => setNewColor(color)}
                />
            ))}
        </div>
        <div className={styles.postItsGrid}>

            {postIts.map((postit) => (
                <div
                    key={postit.id}
                    className={styles.postIt}
                    onDoubleClick={() => startEditingPostit(postit)}
                >
                    <span className={styles.postItColor} style={{ backgroundColor: postit.color }}></span>
                    <span className={styles.postItContent}>{postit.contenu}</span>

                    {editingPostitId === postit.id && (
                        <div className={styles.editPostitCard}>
                            <input
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                onKeyDown={(e) => handleEditKeyDown(e, postit)}
                                placeholder="Ajouter un contenu..."
                            />
                            <div className={styles.colorPicker}>
                                {COLORS.map((color) => (
                                <button
                                key={color}
                                type="button"
                                className={color === editColor ? styles.colorSelected : styles.colorButton}
                                style={{ backgroundColor: color }}
                                onClick={() => setEditColor(color)}
                                />
                            ))}
                            </div>
                            <button type="button" onClick={() => saveEditingPostit(postit)}>
                                Enregistrer
                            </button>                            
                        </div>
                    )}

                    <button
                        type="button"
                        className={styles.deletePostitButton}
                        onClick={() => deletePostit(postit.id)}
                    >
                        ×
                    </button>
                </div>
            ))}

        </div>

    </div>
);

}

export default Postits;