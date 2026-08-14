import {
    getAllProjects,
    createProject as createProjectService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService
} from "../services/projectService.js";

const getProjects = async (req, res) => {
    const projects = await getAllProjects();

    res.json({
        message: "Liste des projets",
        projects: projects
    });
};

const createProject = async (req, res) => {
    const { name, description, status, progress, deadline } = req.body;

    const projectId = await createProjectService(
        name,
        description,
        status,
        progress,
        deadline
    );

    res.status(201).json({
        message: "Projet ajouté avec succès",
        projectId: projectId
    });
};

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, status, progress, deadline } = req.body;

    const result = await updateProjectService(
        name,
        description,
        status,
        progress,
        deadline,
        id
    );

    res.json({
        message: "Projet modifié avec succès",
        changes: result
    });
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    const result = await deleteProjectService(id);

    res.json({
        message: "Projet supprimé avec succès",
        changes: result
    });
};

export {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};