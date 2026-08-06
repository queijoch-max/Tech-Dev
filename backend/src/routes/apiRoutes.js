import {Router} from "express";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use("/tasks", taskRoutes);

router.get("/", (req, res) => {
    res.send("API Hub Dashboard opérationnelle !");
});

export default router;
