import express from "express";
import notificationsController from "./notificationsController.js";
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /notifications/user/{id}:
 *   get:
 *     summary: Retrieve notifications for a specific user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve notifications for
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     responses:
 *       200:
 *         description: A list of notifications for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 notificationId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the notification to mark as read
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The user ID for marking notifications as read
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications/read-selected:
 *   patch:
 *     summary: Mark selected notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of notification IDs to mark as read
 *     responses:
 *       200:
 *         description: Selected notifications marked as read
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a specific notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to delete
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /notifications/user/{user_id}:
 *   delete:
 *     summary: Delete all notifications for a user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete all notifications for
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     responses:
 *       200:
 *         description: All notifications deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router
  .get("/user/:id", verifyUser, notificationsController.getNotificationsByUserIdController)          // Obtener notificaciones por usuario
  .post("/", verifyUser, notificationsController.createNotificationController)                       // Crear notificación
  .patch("/read", verifyUser, notificationsController.markAsReadController)                          // Marcar como leída
  .patch("/read-all",verifyUser, notificationsController.markAsAllReadController)                   //Marcar todas como leida
  .patch('/read-selected', verifyUser, notificationsController.markSelectedAsReadController)        //Marcar seleccionadas como leidas
  .delete("/:id", verifyUser, notificationsController.deleteNotificationController)                  // Eliminar notificación  
  .delete("/user/:user_id", verifyUser, notificationsController.deleteAllNotificationsController)    // Eliminar todas las notificaciones

export default router;
