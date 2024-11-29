import knex from "../../database/knex.js";
const TABLE_NAME = "Notifications";

// Crear notificación
const createNotification = async (notificationData) => {
  try {
    const notificationWithDate = {
      ...notificationData,
      created_at: new Date(), // Asignar la fecha y hora actual
    };

    const [id] = await knex(TABLE_NAME).insert(notificationWithDate);

    return id; // Devuelve el ID de la notificación creada
  } catch (error) {
    throw new Error(`Error creating notification: ${error.message}`);
  }
};


// Marcar notificación como leída
const markAsRead = async (id) => {
  try {
    console.log('ID:::: '  + id);
    const result = await knex(TABLE_NAME)
      .where("id", id) 
      .update({ is_read: "yes" });

    if (result === 0) {
      throw new Error("Notification not found");
    }
    return true;
  } catch (error) {
    throw new Error(`Error marking notification as read: ${error.message}`);
  }
};


// Eliminar notificación
const deleteNotification = async (id) => {
  try {
    const result = await knex(TABLE_NAME).where({ id }).del();
    if (result === 0) {
      throw new Error("Notification not found");
    }
    return true;
  } catch (error) {
    throw new Error(`Error deleting notification: ${error.message}`);
  }
};

// Obtener todas las notificaciones de un usuario
const getNotificationsByUserId = async (userId) => {
  try {
    return await knex(TABLE_NAME).select("*").where({ user_id: userId });
  } catch (error) {
    throw new Error(`Error fetching notifications for user: ${error.message}`);
  }
};

export default {
  createNotification,
  markAsRead,
  deleteNotification,
  getNotificationsByUserId,
};
