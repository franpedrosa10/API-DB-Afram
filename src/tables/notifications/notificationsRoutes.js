import express from "express";
import notificationsController from "./notificationsController.js";

const router = express.Router();

router
  .post("/", notificationsController.createNotificationController)                 // Crear notificación
  .put("/:id/read", notificationsController.markAsReadController)                 // Marcar como leída
  .delete("/:id", notificationsController.deleteNotificationController)           // Eliminar notificación
  .get("/user/:userId", notificationsController.getNotificationsByUserIdController); // Obtener notificaciones por usuario

export default router;
