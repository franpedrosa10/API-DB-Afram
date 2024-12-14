import express from "express";
import supportController from "./supportController.js";
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

/**
 * @swagger
 * /threads:
 *   get:
 *     summary: Retrieve all threads
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     responses:
 *       200:
 *         description: A list of all threads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thread'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/user/{user_id}:
 *   get:
 *     summary: Retrieve all threads for a specific user by their ID
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve threads for
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of threads for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thread'
 *       404:
 *         description: No threads found for this user
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/{id}:
 *   get:
 *     summary: Retrieve a specific thread by ID
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the thread to retrieve
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The details of the thread
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 *       404:
 *         description: Thread not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/create:
 *   post:
 *     summary: Create a new thread
 *     tags: [Threads]
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
 *               userId:
 *                 type: string
 *               subject:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Thread created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/status/{threadId}:
 *   patch:
 *     summary: Update the status of a thread
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the thread to update
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
 *               newStatus:
 *                 type: string
 *                 enum: [open, closed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thread status updated successfully
 *       400:
 *         description: Invalid status or request
 *       404:
 *         description: Thread not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/{id}:
 *   delete:
 *     summary: Delete a thread by ID
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the thread to delete
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thread deleted successfully
 *       404:
 *         description: Thread not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /threads/user/{user_id}:
 *   delete:
 *     summary: Delete all threads of a specific user
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose threads are to be deleted
 *       - in: header
 *         name: user-id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for matching with the token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All threads deleted successfully
 *       404:
 *         description: No threads found for this user
 *       401:
 *         description: Unauthorized
 */

router
        .get("/", verifyUser, verifyRol("admin"), supportController.getAllThreadsController) // Obtener todos los threads
        .get("/user/:user_id", verifyUser, supportController.getThreadsByUserIdController) // Obtener los threads de un user
        .get("/:id", verifyUser, supportController.getThreadsByIdController) // Obtener el thread por id
        .post("/create", verifyUser, supportController.createThreadController) // Crear un thread
        .patch("/status/:threadId", verifyUser, verifyRol("admin"), supportController.updateThreadStatusController) //Cambia el status de un thread
        .delete("/:id", verifyUser, supportController.deleteThreadController)                  // Eliminar thread  
        .delete("/user/:user_id", verifyUser, supportController.deleteAllThreadsController)    // Eliminar todas los thread de un user


export default router;
