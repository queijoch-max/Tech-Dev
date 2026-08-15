import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { Router } from "express";
import requireAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;