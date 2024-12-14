import express from 'express';
import interestRatesController from '../interestRates/interestRatesController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

/**
 * @swagger
 * /interestrates:
 *   get:
 *     summary: Retrieve all interest rates
 *     tags: [InterestRates]
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
 *         description: A list of all interest rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterestRate'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Role not allowed)
 */

/**
 * @swagger
 * /interestrates/{id}:
 *   get:
 *     summary: Retrieve an interest rate by ID
 *     tags: [InterestRates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the interest rate to retrieve
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
 *         description: The interest rate details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestRate'
 *       404:
 *         description: Interest rate not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Role not allowed)
 */

/**
 * @swagger
 * /interestrates/latest:
 *   get:
 *     summary: Retrieve the latest interest rate
 *     tags: [InterestRates]
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
 *         description: The latest interest rate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestRate'
 *       404:
 *         description: Interest rate not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Role not allowed)
 */

/**
 * @swagger
 * /interestrates:
 *   post:
 *     summary: Create a new interest rate
 *     tags: [InterestRates]
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
 *             $ref: '#/components/schemas/InterestRateInput'
 *     responses:
 *       201:
 *         description: Interest rate created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Role not allowed)
 *       400:
 *         description: Invalid input
 */

router
    .get('/',verifyUser, verifyRol("admin"), interestRatesController.getAllInterestRatesController)// Obtener todas las tasas 
    .get('/id/:id',verifyUser, interestRatesController.getInterestRateByIdController)        // Obtener por ID 
    .get('/latest',verifyUser, interestRatesController.getLatestInterestRateController)     // Obtener la última tasa
    .post('/', verifyUser , verifyRol('admin'), interestRatesController.createInterestRateController)// Crear una nueva tasa    

export default router;