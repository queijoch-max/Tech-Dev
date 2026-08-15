import { useState, useEffect } from "react";
import ProjectsTable from "./ProjectsTable";
import styles from "./Projects.module.css";
import { API_URL, authFetch } from "../../config";

// ==============================
// COMPOSANT : GESTION DES PROJETS
// ==============================

function Projects() {

    // ==============================
    // PROJETS
    // ==============================

    const [projects, setProjects] = useState([]);

    // ==============================
    // CREER UN PROJET
    // ==============================

    const createProject = async (name, description, status, progress, deadline) => {
        const response = await authFetch(`${API_URL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description, status, progress, deadline })
        });

        const data = await response.json();

        const newProject = {
            id: data.projectId,
            name,
            description,
            status,
            progress,
            deadline
        };
        setProjects((currentProjects) => [...currentProjects, newProject]);
    };

    // ==============================
    // MODIFIER UN PROJET
    // ==============================

  const updateProject = async (id, field, value) => {
    const currentProject = projects.find((project) => project.id === id);
    const updatedProject = { ...currentProject, [field]: value };

    await authFetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: updatedProject.name,
            description: updatedProject.description,
            status: updatedProject.status,
            progress: updatedProject.progress,
            deadline: updatedProject.deadline
        })
    });

    setProjects((currentProjects) =>
        currentProjects.map((project) =>
            project.id === id ? updatedProject : project
        )
    );
};

    // ==============================
    // DÉPLACER UN PROJET
    // ==============================

    const moveProject = (id, newStatus) => {
        updateProject(id, "status", newStatus);
    };

    const formatDateFr = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

     // ==============================
    // SUPPRIMER UN PROJET
    // ==============================

    const deleteProject = async (id) => {
        await authFetch(`${API_URL}/projects/${id}`, {
            method: "DELETE"
        });

        setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
    };

    // ==============================
    // RÉCUPÉRER LES TÂCHES DU BACKEND
    // ==============================

    useEffect(() => {
        authFetch(`${API_URL}/projects`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data.projects);
            });
    }, []);
    
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
                                            {formatDateFr(project.deadline)}
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
                                            Deadline : {formatDateFr(project.deadline)}
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
                    onAddProject={createProject}
                    onDeleteProject={deleteProject}
                />

            </section>

        </section>
    );
}

export default Projects;