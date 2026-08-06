import styles from "../components/Projects/Projects.module.css"; // adapte le chemin exact
import Projects from "../components/Projects/Projects";

function ProjectsPage() {
    return (
        <main className={styles.projectsPage}>
            <h1 className={styles.pageTitle}>
                SUIVI DE PROJETS
            </h1>
            <Projects />
        </main>
    );
}

export default ProjectsPage;