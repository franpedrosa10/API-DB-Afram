import notificationsService from "./notificationsService.js";

// Crear notificación
const createNotificationController = async (req, res, next) => {
  const notificationData = req.body;
  try {
    const notificationId = await notificationsService.createNotification(notificationData);
    return res.status(201).json({ success: true, notificationId });
  } catch (error) {
    next(error);
  }
};

// Marcar notificación como leída
const markAsReadController = async (req, res, next) => {
  const {id}  = req.body;
  try {
    const result = await notificationsService.markAsRead(id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Eliminar notificación
const deleteNotificationController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await notificationsService.deleteNotification(id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Eliminar todas las notificaciones
const deleteAllNotificationsController = async (req, res, next) => {
  const { userId } = req.params; 
  try {
    const result = await notificationsService.deleteAllNotifications(userId);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Obtener todas las notificaciones de un usuario
const getNotificationsByUserIdController = async (req, res, next) => {
  const { id } = req.params;
  // console.log('User id', id);
  try {
    const notifications = await notificationsService.getNotificationsByUserId(id);
    return res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export default {
  createNotificationController,
  markAsReadController,
  deleteNotificationController,
  getNotificationsByUserIdController,
  deleteAllNotificationsController
};
