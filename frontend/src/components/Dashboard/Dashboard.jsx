import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { API_URL } from "../../config";

// ==============================
// PAGE : DASHBOARD
// ==============================

function Dashboard() {
    

    // ==============================
    // TÂCHES DU JOUR
    // ==============================

    const [tasksToday, setTasksToday] = useState([]);

    // ==============================
    // RÉCUPÉRER LES TÂCHES
    // ==============================

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/tasks`
                );

                if (!response.ok) {
                    console.error(
                        "Erreur lors de la récupération des tâches :",
                        response.status
                    );
                    return;
                }

                const data = await response.json();

                const todayTasks = data.tasks.filter(
    (task) =>
        task.period === "today" &&
        task.status !== "done"
);

setTasksToday(todayTasks);

            } catch (error) {

                console.error(
                    "Erreur réseau lors de la récupération des tâches :",
                    error
                );
            }
        };

        fetchTasks();

    }, []);

    return (
        <main className={styles.dashboard}>

            <h1>3 août 2026</h1>

            {/* ==============================
                RÉSUMÉ
                ============================== */}

            <section className={styles.summary}>

                <div className={styles.card}>

                    <span className={styles.label}>
                        Tâches aujourd'hui
                    </span>

                    <strong>
                        {tasksToday.length}
                    </strong>

                </div>

                <div className={styles.card}>

                    <span className={styles.label}>
                        Projets en cours
                    </span>

                    <strong>
                        3
                    </strong>

                </div>

                <div className={styles.card}>

                    <span className={styles.label}>
                        Météo
                    </span>

                    <strong>
                        ⛈️ Orage
                    </strong>

                    <p>
                        Fais gaffe à tes équipements !
                    </p>

                </div>

            </section>

            {/* ==============================
                CALENDRIER
                ============================== */}

            <section className={styles.calendar}>

                <h2>Calendrier</h2>

                <div className={styles.calendarPlaceholder}>
                    Calendrier à venir...
                </div>

            </section>

        </main>
    );
}

export default Dashboard;