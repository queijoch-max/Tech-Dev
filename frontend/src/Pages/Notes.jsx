import styles from "../components/Notes/Notes.module.css";
import Notes from "../components/Notes/Notes";

// ==============================
// PAGE : NOTES
// ==============================

function NotesPage() {
    return (
        <main className={styles.notesPage}>
            <h1 className={styles.pageTitle}>NOTES</h1>
            <Notes />
        </main>
    );
}

export default NotesPage;