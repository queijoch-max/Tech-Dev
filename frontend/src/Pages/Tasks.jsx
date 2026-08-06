import styles from "../components/Tasks/Tasks.module.css";
import Tasks from "../components/Tasks/Tasks";

// ==============================
// PAGE : TO DO LISTE
// ==============================

function TasksPage() {
    return (
        <main className={styles.tasks}>
            <h1>LISTE DES TÂCHES</h1>
            <Tasks />
        </main>
    );
}

export default TasksPage;
