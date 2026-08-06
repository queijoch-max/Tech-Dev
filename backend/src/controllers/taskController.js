import {
    getAllTasks,
    createTask,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService
} from "../services/taskService.js";

const getTasks = async (req, res) => {
    const tasks = await getAllTasks();

    res.json({
        message: "Liste des tâches",
        tasks: tasks
    });
};

const addTask = (req, res) => {
    const { title, description, status, period } = req.body;

    const taskId = createTask(
        title,
        description,
        status,
        period
    );

    res.json({
        message: "Tâche ajoutée avec succès",
        taskId: taskId
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, period } = req.body;

    const result = updateTaskService(
        title,
        description,
        status,
        period,
        id
    );

    res.json({
        message: "Tâche modifiée avec succès",
        changes: result
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const result = deleteTaskService(id);

    res.json({
        message: "Tâche supprimée avec succès",
        changes: result
    });
};

export {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};