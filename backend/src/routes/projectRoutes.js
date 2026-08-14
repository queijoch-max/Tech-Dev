import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { Router } from "express";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;