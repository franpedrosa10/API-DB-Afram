import express from "express";
import supportController from "./supportController.js";

const router = express.Router();


router
        .get("/", supportController.getAllThreadsController) // Obtener todos los threads
        .get("/user/:user_id", supportController.getThreadsByUserIdController) // Obtener los threads de un user
        .get("/:id", supportController.getThreadsByIdController) // Obtener el thread por id
        .post("/create", supportController.createThreadController) // Crear un thread
        .patch("/status/:threadId", supportController.updateThreadStatusController); //Cambia el status de un thread


export default router;
