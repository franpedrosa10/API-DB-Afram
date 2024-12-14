import express from "express";
import supportMessagesController from "./supportMessagesController.js";
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /messages/{threadId}:
 *   get:
 *     summary: Retrieve all messages by thread ID
 *     tags: [SupportMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *         description: The thread ID to fetch messages for
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     responses:
 *       200:
 *         description: A list of messages for the given thread
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   messageId:
 *                     type: integer
 *                     description: The message ID
 *                   senderType:
 *                     type: string
 *                     description: The sender's type (user or support)
 *                   message:
 *                     type: string
 *                     description: The message content
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the message
 *       404:
 *         description: No messages found for this thread
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /messages/{threadId}:
 *   post:
 *     summary: Add a message to a thread
 *     tags: [SupportMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *         description: The thread ID to add a message to
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
 *               senderType:
 *                 type: string
 *                 description: The sender's type (user or support)
 *               message:
 *                 type: string
 *                 description: The content of the message
 *     responses:
 *       201:
 *         description: Message successfully added to the thread
 *       404:
 *         description: Failed to add message to the thread
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
        .get("/:threadId", verifyUser, supportMessagesController.getMessagesByThreadIdController) // Obtener todos los mensages por thread id
        .post("/:threadId", verifyUser, supportMessagesController.addMessageToThreadController) // Agregar mensaje a un thread

export default router;


