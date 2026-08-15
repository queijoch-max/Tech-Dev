import { useState } from "react";
import styles from "./Tasks.module.css";
import { API_URL, authFetch } from "../../config";

// ==============================
// COMPOSANT : TABLEAU DES TÂCHES
// ==============================

function TasksTable({
    title = "Mes tâches du jour",
    tasks = [],
    onAddTask,
    onToggleTask,
    onDeleteTask,
    onUpdateTask,
}) {

    // ==============================
    // ÉTAT
    // ==============================

    const [newTask, setNewTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    // ==============================
    // AJOUTER UNE TÂCHE
    // ==============================

    const addTask = () => {

        const title = newTask.trim();

        if (!title) return;

        onAddTask?.(title);

        setNewTask("");
    };

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            addTask();
        }
    };

    // ==============================
    // COMMENCER LA MODIFICATION
    // ==============================

    const startEditing = (task) => {

        setEditingTaskId(task.id);
        setEditingTitle(task.title);
    };

    // ==============================
    // MODIFIER UNE TÂCHE
    // ==============================

    const updateTask = async (task) => {

        const newTitle = editingTitle.trim();

        // Titre vide
        if (!newTitle) {

            setEditingTaskId(null);
            setEditingTitle("");

            return;
        }

        // Aucun changement
        if (newTitle === task.title) {

            setEditingTaskId(null);
            setEditingTitle("");

            return;
        }

        try {

            const response = await authFetch(
                `${API_URL}/tasks/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle,
                        description: task.description || "",
                        status: task.status || "todo",
                        period: task.period
                    })
                }
            );

            if (!response.ok) {

                console.error(
                    "Erreur lors de la modification :",
                    response.status
                );

                return;
            }

            // ==============================
            // MISE À JOUR IMMÉDIATE DE REACT
            // ==============================

            onUpdateTask?.(task.id, newTitle);

            // ==============================
            // FERMER LE CHAMP D'ÉDITION
            // ==============================

            setEditingTaskId(null);
            setEditingTitle("");

        } catch (error) {

            console.error(
                "Erreur réseau lors de la modification :",
                error
            );
        }
    };

    // ==============================
    // ANNULER LA MODIFICATION
    // ==============================

    const cancelEditing = () => {

        setEditingTaskId(null);
        setEditingTitle("");
    };

    // ==============================
    // TOUCHES DU CLAVIER
    // ==============================

    const handleEditKeyDown = (event, task) => {

        if (event.key === "Enter") {

            event.preventDefault();

            updateTask(task);

            return;
        }

        if (event.key === "Escape") {

            event.preventDefault();

            cancelEditing();
        }
    };

    // ==============================
    // SUPPRIMER UNE TÂCHE
    // ==============================

    const deleteTask = async (id) => {

        try {

            const response = await authFetch(
                `${API_URL}/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {

                console.error(
                    "Erreur lors de la suppression :",
                    response.status
                );

                return;
            }

            // Suppression immédiate de l'affichage
            onDeleteTask?.(id);

        } catch (error) {

            console.error(
                "Erreur réseau lors de la suppression :",
                error
            );
        }
    };

 // ==============================
// COCHER / DÉCOCHER UNE TÂCHE
// ==============================

const toggleTask = (task) => {

    onToggleTask?.(task.id);
};
    // ==============================
    // AFFICHAGE
    // ==============================

    return (
        <div className={styles.taskList}>

            {/* ==============================
                EN-TÊTE
                ============================== */}

            <div className={styles.taskListHeader}>

                <h2>{title}</h2>

            </div>

            {/* ==============================
                LISTE DES TÂCHES
                ============================== */}

            <div className={styles.taskListItems}>

                {tasks.map((task) => (

                    <div
                        key={task.id}
                        className={`${styles.taskItem} ${
                            task.status === "done"
                                ? styles.completed
                                : ""
                        }`}
                    >

                        {/* ==============================
                            CHECKBOX
                            ============================== */}

                        <input
                            type="checkbox"
                            checked={task.status === "done"}
                            onChange={() =>
                                toggleTask(task)
                            }
                        />

                        {/* ==============================
                            TITRE
                            ============================== */}

                        {editingTaskId === task.id ? (

                            <input
                                type="text"
                                value={editingTitle}
                                onChange={(event) =>
                                    setEditingTitle(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) =>
                                    handleEditKeyDown(
                                        event,
                                        task
                                    )
                                }
                                autoFocus
                            />

                        ) : (

                            <span
                                onDoubleClick={() =>
                                    startEditing(task)
                                }
                            >
                                {task.title}
                            </span>

                        )}

                        {/* ==============================
                            SUPPRIMER
                            ============================== */}

                        <button
                            type="button"
                            onClick={() =>
                                deleteTask(task.id)
                            }
                        >
                            Supprimer
                        </button>

                    </div>

                ))}

            </div>

            {/* ==============================
                AJOUT D'UNE TÂCHE
                ============================== */}

            <div className={styles.addTask}>

                <input
                    type="text"
                    value={newTask}
                    onChange={(event) =>
                        setNewTask(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter une tâche..."
                />

                <button
                    type="button"
                    onClick={addTask}
                >
                    Ajouter
                </button>

            </div>

        </div>
    );
}

export default TasksTable;