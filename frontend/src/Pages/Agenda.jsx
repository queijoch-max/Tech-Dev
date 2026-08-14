import styles from "../components/Agenda/Agenda.module.css";
import Agenda from "../components/Agenda/Agenda";

// ==============================
// PAGE : AGENDA
// ==============================

function AgendaPage() {
    return (
        <main className={styles.agendaPage}>
            <h1 className={styles.pageTitle}>AGENDA</h1>
            <Agenda />
        </main>
    );
}

export default AgendaPage;