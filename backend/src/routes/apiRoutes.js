import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import projectRoutes from "./projectRoutes.js";
import agendaRoutes from "./agendaRoutes.js";
import notesRoutes from "./notesRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
router.use("/agenda", agendaRoutes);
router.use("/notes", notesRoutes);
router.use("/auth", userRoutes);

router.get("/", (req, res) => {
    res.send("API Hub Dashboard opérationnelle !");
});

export default router;
