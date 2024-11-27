import express from "express";
import supportController from "./supportController.js";

const router = express.Router();


router
        .get("/", supportController.getAllThreadsController) // Obtener todos los threads
        .get("/user/:UserId", supportController.getThreadsByUserIdController) // Obtener los threads de un user
        .post("/create", supportController.createThreadController) // Crear un thread
        .patch("/status/:threadId", supportController.updateThreadStatusController); //Cambia el status de un thread


export default router;