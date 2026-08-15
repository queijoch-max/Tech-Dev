import { getNotes, createNote, updateNote, deleteNote, getPostits, createPostit, updatePostit, deletePostit } from "../controllers/notesController.js";
import { Router } from "express";
import requireAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

router.get("/postits", getPostits);
router.post("/postits", createPostit);
router.put("/postits/:id", updatePostit);
router.delete("/postits/:id", deletePostit);

export default router;  