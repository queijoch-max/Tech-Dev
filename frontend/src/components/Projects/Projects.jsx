import { useState } from "react";
import ProjectsTable from "./ProjectsTable";
import styles from "./Projects.module.css";

// ==============================
// COMPOSANT : GESTION DES PROJETS
// ==============================

function Projects() {

    // ==============================
    // PROJETS
    // ==============================

    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Hub Dashboard",
            description: "Dashboard personnel de gestion",
            status: "in_progress",
            progress: 75,
            deadline: "15/09/2026"
        },
        {
            id: 2,
            name: "Portfolio",
            description: "Portfolio développeuse web",
            status: "not_started",
            progress: 0,
            deadline: "30/09/2026"
        },
        {
            id: 3,
            name: "Projet IA",
            description: "Projet autour de l'intelligence artificielle",
            status: "not_started",
            progress: 0,
            deadline: "15/10/2026"
        },
        {
            id: 4,
            name: "Ancien projet",
            description: "Projet personnel terminé",
            status: "completed",
            progress: 100,
            deadline: "20/07/2026"
        }
    ]);

    // ==============================
    // MODIFIER UN PROJET
    // ==============================

    const updateProject = (id, field, value) => {

        setProjects((currentProjects) =>
            currentProjects.map((project) =>
                project.id === id
                    ? {
                        ...project,
                        [field]: value
                    }
                    : project
            )
        );
    };

    // ==============================
    // DÉPLACER UN PROJET
    // ==============================

    const moveProject = (id, newStatus) => {

        setProjects((currentProjects) =>
            currentProjects.map((project) =>
                project.id === id
                    ? {
                        ...project,
                        status: newStatus
                    }
                    : project
            )
        );
    };

    return (
        <section className={styles.projects}>

            {/* ==============================
                VUE GÉNÉRALE
                ============================== */}

            <section className={styles.generalProjects}>

                <h2>Mes projets</h2>

                <div className={styles.kanban}>

                    {/* PAS COMMENCÉ */}

                    <div
                        className={styles.kanbanColumn}
                        onDragOver={(event) =>
                            event.preventDefault()
                        }
                        onDrop={(event) => {

                            const projectId = Number(
                                event.dataTransfer.getData(
                                    "projectId"
                                )
                            );

                            moveProject(
                                projectId,
                                "not_started"
                            );
                        }}
                    >

                        <div className={styles.columnHeader}>

                            <h3>
                                Pas commencé
                            </h3>

                            <span>
                                {
                                    projects.filter(
                                        (project) =>
                                            project.status ===
                                            "not_started"
                                    ).length
                                }
                            </span>

                        </div>

                        <div className={styles.projectCards}>

                            {projects
                                .filter(
                                    (project) =>
                                        project.status ===
                                        "not_started"
                                )
                                .map((project) => (

                                    <div
                                        key={project.id}
                                        className={styles.projectCard}
                                        draggable
                                        onDragStart={(event) =>
                                            event.dataTransfer.setData(
                                                "projectId",
                                                project.id
                                            )
                                        }
                                    >

                                        <h4>
                                            {project.name}
                                        </h4>

                                        <p>
                                            {project.description}
                                        </p>

                                        <small>
                                            Deadline :{" "}
                                            {project.deadline}
                                        </small>

                                    </div>

                                ))}

                        </div>

                    </div>

                    {/* EN COURS */}

                    <div
                        className={styles.kanbanColumn}
                        onDragOver={(event) =>
                            event.preventDefault()
                        }
                        onDrop={(event) => {

                            const projectId = Number(
                                event.dataTransfer.getData(
                                    "projectId"
                                )
                            );

                            moveProject(
                                projectId,
                                "in_progress"
                            );
                        }}
                    >

                        <div className={styles.columnHeader}>

                            <h3>
                                En cours
                            </h3>

                            <span>
                                {
                                    projects.filter(
                                        (project) =>
                                            project.status ===
                                            "in_progress"
                                    ).length
                                }
                            </span>

                        </div>

                        <div className={styles.projectCards}>

                            {projects
                                .filter(
                                    (project) =>
                                        project.status ===
                                        "in_progress"
                                )
                                .map((project) => (

                                    <div
                                        key={project.id}
                                        className={styles.projectCard}
                                        draggable
                                        onDragStart={(event) =>
                                            event.dataTransfer.setData(
                                                "projectId",
                                                project.id
                                            )
                                        }
                                    >

                                        <h4>
                                            {project.name}
                                        </h4>

                                        <p>
                                            {project.description}
                                        </p>

                                        <div className={styles.projectProgress}>
                                            <span>Prog</span>{" "}

                                            <strong
                                                className={
                                                    project.progress <= 30
                                                        ? styles.progressRed
                                                        : project.progress <= 60
                                                            ? styles.progressOrange
                                                            : project.progress <= 90
                                                                ? styles.progressYellow
                                                                : styles.progressGreen
                                                }
                                            >
                                                {project.progress}%
                                            </strong>
                                        </div>

                                        <small>
                                            Deadline :{" "}
                                            {project.deadline}
                                        </small>

                                    </div>

                                ))}

                        </div>

                    </div>

                    {/* TERMINÉ */}

                    <div
                        className={styles.kanbanColumn}
                        onDragOver={(event) =>
                            event.preventDefault()
                        }
                        onDrop={(event) => {

                            const projectId = Number(
                                event.dataTransfer.getData(
                                    "projectId"
                                )
                            );

                            moveProject(
                                projectId,
                                "completed"
                            );
                        }}
                    >

                        <div className={styles.columnHeader}>

                            <h3>
                                Terminé
                            </h3>

                            <span>
                                {
                                    projects.filter(
                                        (project) =>
                                            project.status ===
                                            "completed"
                                    ).length
                                }
                            </span>

                        </div>

                        <div className={styles.projectCards}>

                            {projects
                                .filter(
                                    (project) =>
                                        project.status ===
                                        "completed"
                                )
                                .map((project) => (

                                    <div
                                        key={project.id}
                                        className={styles.projectCard}
                                        draggable
                                        onDragStart={(event) =>
                                            event.dataTransfer.setData(
                                                "projectId",
                                                project.id
                                            )
                                        }
                                    >

                                        <h4>
                                            {project.name}
                                        </h4>

                                        <p>
                                            {project.description}
                                        </p>

                                        <small>
                                            Deadline :{" "}
                                            {project.deadline}
                                        </small>

                                    </div>

                                ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* ==============================
                TABLEAU DÉTAILLÉ
                ============================== */}

            <section className={styles.projectManagement}>

                <h2>Gestion des projets</h2>

                <ProjectsTable
                    projects={projects}
                    onUpdateProject={updateProject}
                />

            </section>

        </section>
    );
}

export default Projects;