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

const addTask = async (req, res) => {
    const { title, description, status, period } = req.body;

    const taskId = await createTask(
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

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, period } = req.body;

    const result = await updateTaskService(
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

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const result = await deleteTaskService(id);

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
