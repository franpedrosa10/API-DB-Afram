import express from "express";
import notificationsController from "./notificationsController.js";
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

router
  .post("/", verifyUser, notificationsController.createNotificationController)                       // Crear notificación
  .patch("/read", verifyUser, notificationsController.markAsReadController)                          // Marcar como leída
  .patch("/read-all",verifyUser, notificationsController.markAsAllReadController)                   //Marcar todas como leida
  .patch('/read-selected', verifyUser, notificationsController.markSelectedAsReadController)        //Marcar seleccionadas como leidas
  .delete("/:id", verifyUser, notificationsController.deleteNotificationController)                  // Eliminar notificación  
  .delete("/user/:user_id", verifyUser, notificationsController.deleteAllNotificationsController)    // Eliminar todas las notificaciones
  .get("/user/:id", verifyUser, notificationsController.getNotificationsByUserIdController)          // Obtener notificaciones por usuario

export default router;
