import express from "express";
import supportController from "./supportController.js";
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();


router
        .get("/", verifyUser, verifyRol("admin"), supportController.getAllThreadsController) // Obtener todos los threads
        .get("/user/:user_id", verifyUser, supportController.getThreadsByUserIdController) // Obtener los threads de un user
        .get("/:id", verifyUser, supportController.getThreadsByIdController) // Obtener el thread por id
        .post("/create", verifyUser, supportController.createThreadController) // Crear un thread
        .patch("/status/:threadId", verifyUser, verifyRol("admin"), supportController.updateThreadStatusController) //Cambia el status de un thread
        .delete("/:id", verifyUser, supportController.deleteThreadController)                  // Eliminar thread  
        .delete("/user/:user_id", verifyUser, supportController.deleteAllThreadsController)    // Eliminar todas los thread de un user


export default router;
