import React, { useEffect, useState } from "react";
import TasksTable from "../components/Tasks/TasksTable";
import styles from "../components/Tasks/Tasks.module.css";
import { API_URL } from "../config";

// ==============================
// PAGE : TO DO LISTE
// ==============================

function Tasks() {

    // ==============================
    // TÂCHES DU JOUR
    // ==============================

    const [tasksToday, setTasksToday] = useState([]);

    // ==============================
    // TÂCHES DU MOIS
    // ==============================

    const [tasksMonth, setTasksMonth] = useState([]);

    // ==============================
    // RÉCUPÉRER LES TÂCHES DU BACKEND
    // ==============================

    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then((response) => response.json())
            .then((data) => {

                const todayTasks = data.tasks.filter(
                    (task) => task.period === "today"
                );

                const monthTasks = data.tasks.filter(
                    (task) => task.period === "month"
                );

                setTasksToday(todayTasks);
                setTasksMonth(monthTasks);
            });
    }, []);

    // ==============================
    // AJOUTER UNE TÂCHE DU JOUR
    // ==============================

    const addTaskToday = async (title) => {

        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: "",
                status: "todo",
                period: "today"
            })
        });

        const data = await response.json();

        const newTask = {
            id: data.taskId,
            title: title,
            description: "",
            status: "todo",
            period: "today"
        };

        setTasksToday((currentTasks) => [
            ...currentTasks,
            newTask
        ]);
    };

    // ==============================
    // AJOUTER UNE TÂCHE DU MOIS
    // ==============================

    const addTaskMonth = async (title) => {

        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: "",
                status: "todo",
                period: "month"
            })
        });

        const data = await response.json();

        const newTask = {
            id: data.taskId,
            title: title,
            description: "",
            status: "todo",
            period: "month"
        };

        setTasksMonth((currentTasks) => [
            ...currentTasks,
            newTask
        ]);
    };

    // ==============================
    // COCHER / DÉCOCHER UNE TÂCHE DU JOUR
    // ==============================

 const toggleTaskToday = async (id) => {

    const task = tasksToday.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === "done" ? "todo" : "done";

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: task.title,
            description: task.description || "",
            status: newStatus,
            period: task.period
        })
    });

    if (!response.ok) {
        console.error("Erreur lors de la modification du statut :", response.status);
        return;
    }

    setTasksToday((currentTasks) =>
        currentTasks.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
        )
    );
};

    // ==============================
    // COCHER / DÉCOCHER UNE TÂCHE DU MOIS
    // ==============================

 const toggleTaskMonth = async (id) => {

    const task = tasksMonth.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === "done" ? "todo" : "done";

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: task.title,
            description: task.description || "",
            status: newStatus,
            period: task.period
        })
    });

    if (!response.ok) {
        console.error("Erreur lors de la modification du statut :", response.status);
        return;
    }

    setTasksMonth((currentTasks) =>
        currentTasks.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
        )
    );
};

// ==============================
// MODIFIER UNE TÂCHE DU JOUR
// ==============================

const updateTaskToday = (id, title) => {

    setTasksToday((currentTasks) =>
        currentTasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    title: title
                }
                : task
        )
    );
};

// ==============================
// MODIFIER UNE TÂCHE DU MOIS
// ==============================

const updateTaskMonth = (id, title) => {

    setTasksMonth((currentTasks) =>
        currentTasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    title: title
                }
                : task
        )
    );
};

    // ==============================
    // SUPPRIMER UNE TÂCHE DU JOUR
    // ==============================

    const deleteTaskToday = (id) => {
        setTasksToday((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    };

    // ==============================
    // SUPPRIMER UNE TÂCHE DU MOIS
    // ==============================

    const deleteTaskMonth = (id) => {
        setTasksMonth((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    };

    // ==============================
    // AFFICHAGE
    // ==============================

    return (
        <main className={styles.tasks}>

            <h1>LISTE DES TÂCHES</h1>

            <div className={styles.taskTables}>

                <TasksTable
                    title="Mes tâches du jour"
                    tasks={tasksToday}
                    onAddTask={addTaskToday}
                    onToggleTask={toggleTaskToday}
                    onDeleteTask={deleteTaskToday}
                    onUpdateTask={updateTaskToday}
                />

                <TasksTable
                    title="Mes tâches du mois"
                    tasks={tasksMonth}
                    onAddTask={addTaskMonth}
                    onToggleTask={toggleTaskMonth}
                    onDeleteTask={deleteTaskMonth}
                    onUpdateTask={updateTaskMonth}
                />

            </div>

        </main>
    );
}

export default Tasks;