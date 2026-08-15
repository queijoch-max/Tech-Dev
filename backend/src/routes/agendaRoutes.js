import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/agendaController.js";
import { Router } from "express";
import requireAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
