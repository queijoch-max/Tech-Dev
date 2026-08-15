import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import projectRoutes from "./projectRoutes.js";
import agendaRoutes from "./agendaRoutes.js";
import notesRoutes from "./notesRoutes.js";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
router.use("/agenda", agendaRoutes);
router.use("/notes", notesRoutes);

router.get("/", (req, res) => {
    res.send("API Hub Dashboard opérationnelle !");
});

export default router;
