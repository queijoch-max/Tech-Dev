import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/agendaController.js";
import { Router } from "express";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
