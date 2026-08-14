import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import projectRoutes from "./projectRoutes.js";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);

router.get("/", (req, res) => {
    res.send("API Hub Dashboard opérationnelle !");
});

export default router;
