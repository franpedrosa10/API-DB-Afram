import express from "express";
import supportMessagesController from "./supportMessagesController.js";

const router = express.Router();


router
        .get("/:threadId", supportMessagesController.getMessagesByThreadIdController) // Obtener todos los mensages por thread id
        .post("/:threadId", supportMessagesController.addMessageToThreadController) // Agregar mensaje a un thread

export default router;


