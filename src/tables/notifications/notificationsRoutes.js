import express from "express";
import notificationsController from "./notificationsController.js";

const router = express.Router();

router
  .post("/", notificationsController.createNotificationController)                       // Crear notificación
  .patch("/read", notificationsController.markAsReadController)                          // Marcar como leída
  .patch("/read-all", notificationsController.markAsAllReadController)                   //Marcar todas como leida
  .patch('/read-selected', notificationsController.markSelectedAsReadController)                           //Marcar seleccionadas como leidas
  .delete("/:id", notificationsController.deleteNotificationController)                  // Eliminar notificación  
  .delete("/user/:user_id", notificationsController.deleteAllNotificationsController)    // Eliminar todas las notificaciones
  .get("/user/:id", notificationsController.getNotificationsByUserIdController)          // Obtener notificaciones por usuario

export default router;
