import express from "express";
import supportMessagesController from "./supportMessagesController.js";
import verifyUser from '../../middlewares/authUser.js';


const router = express.Router();

router
        .get("/:threadId", verifyUser, supportMessagesController.getMessagesByThreadIdController) // Obtener todos los mensages por thread id
        .post("/:threadId", verifyUser, supportMessagesController.addMessageToThreadController) // Agregar mensaje a un thread

export default router;


