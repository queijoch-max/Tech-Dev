import {Router} from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/taskController.js";
import requireAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
