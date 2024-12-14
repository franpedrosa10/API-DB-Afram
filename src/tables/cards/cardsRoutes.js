import express from 'express';
import cardController from '../cards/cardsController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Retrieve all cards
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
 *     responses:
 *       200:
 *         description: A list of all cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cards/{cardId}:
 *   get:
 *     summary: Retrieve a specific card by ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the card to retrieve
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
 *         description: The card details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cards/user/{userId}:
 *   get:
 *     summary: Retrieve all cards for a specific user
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve cards for
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
 *         description: List of cards for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       404:
 *         description: No cards found for the user
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cards/account/{accountId}:
 *   get:
 *     summary: Retrieve all cards for a specific account
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the account to retrieve cards for
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
 *         description: List of cards for the specified account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       404:
 *         description: No cards found for the account
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
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
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: Card created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /cards/deactivate:
 *   put:
 *     summary: Deactivate a card
 *     tags: [Cards]
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
 *               card_id:
 *                 type: integer
 *                 description: The ID of the card to deactivate
 *     responses:
 *       200:
 *         description: Card deactivated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router
    .get('/', verifyUser, cardController.getAllCardsController)                             // Obtener todas las tarjetas 
    .get('/:cardId', verifyUser, cardController.getCardByIdController)                      // Obtener tarjeta por ID 
    .get('/user/:userId', verifyUser, cardController.getCardsByUserIdController)            // Obtener tarjetas por usuario 
    .get('/account/:accountId', verifyUser, cardController.getCardsByAccountIdController)   // Obtener tarjetas por ID de cuenta 
    .post('/', verifyUser, cardController.createCardController)                             // Crear una nueva tarjeta 
    .put('/deactivate', verifyUser, cardController.deactivateCardController)                // Dar de baja tarjeta 

export default router;