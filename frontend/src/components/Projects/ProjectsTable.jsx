import { useState } from "react";
import styles from "./Projects.module.css";

// ==============================
// COMPOSANT : TABLEAU DE GESTION
// ==============================

function ProjectsTable({
    projects = [],
    onAddProject,
    onDeleteProject,
    onUpdateProject
}) {

    // ==============================
    // ÉTAT
    // ==============================

    const [newProject, setNewProject] = useState("");

    const [sortBy, setSortBy] = useState("");
    const sortedProjects = [...projects].sort((a, b) => {
        if (!sortBy) return 0;
        return a[sortBy].localeCompare(b[sortBy]);
    });

    // ==============================
    // AJOUTER UN PROJET
    // ==============================

    const addProject = () => {

        const name = newProject.trim();
        const description = "";
        const status = "not_started";
        const progress = 0;
        const deadline = "";

        onAddProject(name, description, status, progress, deadline);
        setNewProject("");
    };

    const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addProject();
    }
};

    // ==============================
    // SUPPRIMER UN PROJET
    // ==============================

    const deleteProject = (projectId) => {
        onDeleteProject(projectId);
    };

    return (
        <div className={styles.projectsTable}>

            {/* ==============================
                TRIER LES PROJETS
                ============================== */}

            <div className={styles.sortBar}>
                <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Trier par...</option>
                    <option value="name">Nom</option>
                    <option value="status">Statut</option>
                    <option value="deadline">Deadline</option>
                </select>
            </div>

            {/* ==============================
                EN-TÊTE
                ============================== */}

            <div className={styles.tableHeader}>

                <span>Nom du projet</span>
                <span>Description</span>
                <span>Statuts</span>
                <span>Progression</span>
                <span>Deadline</span>
                <span></span>

            </div>

            {/* ==============================
                PROJETS
                ============================== */}

            {sortedProjects.map((project) => (

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

                    {/* SUPPRIMER */}

                    <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                    >
                        Supprimer
                    </button>

                </div>

            ))}

            {/* ==============================
                AJOUT D'UN PROJET
                ============================== */}

            <div className={styles.addProject}>
                <input
                    type="text"
                    placeholder="Nom du projet"
                    value={newProject}
                    onChange={(event) => setNewProject(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" onClick={addProject}>
                    Ajouter
                </button>
            </div>

        </div>
    );
}

export default ProjectsTable;