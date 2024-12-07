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

// Obtener todas las notificaciones de un usuario
const getNotificationsByUserIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const notifications = await notificationsService.getNotificationsByUserId(id);
    return res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Eliminar todas las notificaciones
const deleteAllNotificationsController = async (req, res, next) => {
  const { user_id } = req.params; 
  try {
    const result = await notificationsService.deleteAllNotifications(user_id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Marcar todas las notificaciones de un usuario como leidas
const markAsAllReadController = async (req, res, next) => {
  const { user_id } = req.body; 
  try {
    const result = await notificationsService.markAsAllRead(user_id);
    return res.status(200).json({ success: result });
  } catch (error) {
    next(error);
  }
};

// Borrar las notificaciones seleccionadas de un usuario 
const deleteSelectedNotificationsController = async (req, res, next) => {
  const { ids } = req.params;
  try {
    const result = await notificationsService.deleteSelectedNotifications(ids);
    return res.status(200).json({ success: true, deletedCount: result });
  } catch (error) {
    next(error);
  }
};

// Marcar las notificaciones seleccionadas de un usuario como leidas
const markSelectedAsReadController = async (req, res, next) => {
  const { ids } = req.body;
  try {
    const result = await notificationsService.markSelectedAsRead(ids);
    return res.status(200).json({ success: true, updatedCount: result });
  } catch (error) {
    next(error);
  }
};



export default {
  createNotificationController,
  markAsReadController,
  deleteNotificationController,
  getNotificationsByUserIdController,
  deleteAllNotificationsController,
  markAsAllReadController,
  deleteSelectedNotificationsController,
  markSelectedAsReadController
};
