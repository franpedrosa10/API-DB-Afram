import express from "express";
import notificationsController from "./notificationsController.js";

const router = express.Router();

router
  .post("/", notificationsController.createNotificationController)                       // Crear notificación
  .patch("/read", notificationsController.markAsReadController)                          // Marcar como leída
  .delete("/:id", notificationsController.deleteNotificationController)                  // Eliminar notificación  
  .delete("/user/:user_id", notificationsController.deleteAllNotificationsController)    // Eliminar todas las notificaciónes
  .get("/user/:id", notificationsController.getNotificationsByUserIdController)          // Obtener notificaciones por usuario
  .patch("/read-all", notificationsController.markAsAllReadController)                    //Marcar todas como leida

export default router;
