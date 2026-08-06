import styles from "./Projects.module.css";

// ==============================
// COMPOSANT : TABLEAU DE GESTION
// ==============================

function ProjectsTable({
    projects = [],
    onUpdateProject
}) {

    return (
        <div className={styles.projectsTable}>

            {/* ==============================
                EN-TÊTE
                ============================== */}

            <div className={styles.tableHeader}>

                <span>Nom du projet</span>
                <span>Description</span>
                <span>Status</span>
                <span>Progression</span>
                <span>Deadline</span>

            </div>

            {/* ==============================
                PROJETS
                ============================== */}

            {projects.map((project) => (

                <div
                    key={project.id}
                    className={styles.tableRow}
                >

                    {/* NOM */}

                    <input
                        type="text"
                        value={project.name}
                        onChange={(event) =>
                            onUpdateProject(
                                project.id,
                                "name",
                                event.target.value
                            )
                        }
                    />

                    {/* DESCRIPTION */}

                    <input
                        type="text"
                        value={project.description}
                        onChange={(event) =>
                            onUpdateProject(
                                project.id,
                                "description",
                                event.target.value
                            )
                        }
                    />

                    {/* STATUS */}

                    <select
                        value={project.status}
                        onChange={(event) =>
                            onUpdateProject(
                                project.id,
                                "status",
                                event.target.value
                            )
                        }
                    >

                        <option value="not_started">
                            Pas commencé
                        </option>

                        <option value="in_progress">
                            En cours
                        </option>

                        <option value="completed">
                            Terminé
                        </option>

                    </select>

                    {/* PROGRESSION */}

<input
    type="number"
    min="0"
    max="100"
    value={project.progress}
    className={
        project.progress <= 30
            ? styles.progressRed
            : project.progress <= 60
                ? styles.progressOrange
                : project.progress <= 90
                    ? styles.progressYellow
                    : styles.progressGreen
    }
    onChange={(event) =>
        onUpdateProject(
            project.id,
            "progress",
            Number(event.target.value)
        )
    }
/>

                    {/* DEADLINE */}

                    <input
                        type="date"
                        value={project.deadline}
                        onChange={(event) =>
                            onUpdateProject(
                                project.id,
                                "deadline",
                                event.target.value
                            )
                        }
                    />

                </div>

            ))}

        </div>
    );
}

export default ProjectsTable;