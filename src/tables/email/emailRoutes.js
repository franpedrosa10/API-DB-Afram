import express from 'express';
import emailController from '../email/emailController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /cards/send-transfer:
 *   post:
 *     summary: Send transfer email
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: user-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               amount:
 *                 type: number
 *               sourceUserId:
 *                 type: string
 *               destinationUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer email sent successfully
 *       400:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cards/send-recover:
 *   post:
 *     summary: Send recovery email
 *     tags: [Cards]
 *     parameters:
 *       - in: header
 *         name: user-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID for matching with the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recovery email sent successfully
 *       400:
 *         description: Missing email field
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/send-transfer", verifyUser, emailController.sendTransferEmail);    // Enviar mail por transferencia
router.post("/send-recover", emailController.sendRecoveryToken)  //Enviar mail para recuperar contrasena

export default router;
