import express from "express";
import notificationsController from "./notificationsController.js";

const router = express.Router();

router
  .post("/", notificationsController.createNotificationController)                 // Crear notificación
  .patch("/read", notificationsController.markAsReadController)                 // Marcar como leída
  .delete("/:id", notificationsController.deleteNotificationController)           // Eliminar notificación  
  .delete("/:userId", notificationsController.deleteAllNotificationsController)           // Eliminar notificación
  .get("/user/:id", notificationsController.getNotificationsByUserIdController); // Obtener notificaciones por usuario

export default router;
