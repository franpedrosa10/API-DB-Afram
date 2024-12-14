import express from 'express';
import fixedTermsController from '../fixedTerms/fixedTermsController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /fixedterms:
 *   get:
 *     summary: Retrieve all fixed terms
 *     tags: [FixedTerms]
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
 *         description: A list of all fixed terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedTerm'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

/**
 * @swagger
 * /fixedterms/{id}:
 *   get:
 *     summary: Retrieve a specific fixed term by ID
 *     tags: [FixedTerms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the fixed term to retrieve
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
 *         description: The details of the fixed term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedTerm'
 *       404:
 *         description: Fixed term not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

/**
 * @swagger
 * /fixedterms/account/{account_id}:
 *   get:
 *     summary: Retrieve fixed terms by account ID
 *     tags: [FixedTerms]
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID to retrieve fixed terms
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
 *         description: A list of fixed terms for the specified account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedTerm'
 *       404:
 *         description: No fixed terms found for the account
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

/**
 * @swagger
 * /fixedterms:
 *   post:
 *     summary: Create a new fixed term
 *     tags: [FixedTerms]
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
 *               account_id:
 *                 type: integer
 *               invested_amount:
 *                 type: number
 *                 format: decimal
 *               start_date:
 *                 type: string
 *                 format: date
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               interest_rate_id:
 *                 type: integer
 *               interest_earned:
 *                 type: number
 *                 format: decimal
 *             required:
 *               - account_id
 *               - invested_amount
 *               - start_date
 *               - expiration_date
 *               - interest_rate_id
 *               - interest_earned
 *     responses:
 *       201:
 *         description: Fixed term created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedTerm'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

/**
 * @swagger
 * /fixedterms/update/{id}:
 *   patch:
 *     summary: Update a fixed term by ID
 *     tags: [FixedTerms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the fixed term to update
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
 *               invested_amount:
 *                 type: number
 *                 format: decimal
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               interest_rate_id:
 *                 type: integer
 *               interest_earned:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       200:
 *         description: Fixed term updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedTerm'
 *       404:
 *         description: Fixed term not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

/**
 * @swagger
 * /fixedterms/is-paid:
 *   patch:
 *     summary: Mark a fixed term as paid
 *     tags: [FixedTerms]
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
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fixed term marked as paid
 *       404:
 *         description: Fixed term not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: User ID does not match with the token
 */

router
    .get('/', verifyUser, fixedTermsController.getAllFixedTermsController)                   // Obtener todos los plazos fijos 
    .get('/:id', verifyUser, fixedTermsController.getFixedTermByIdController)                // Obtener plazo fijo por ID    
    .get('/account/:account_id', verifyUser, fixedTermsController.getFixedTermsByAccountIdController)// Obtener plazos fijos por ID de usuario 
    .post('/', verifyUser, fixedTermsController.createFixedTermController)                   // Crear un nuevo plazo fijo      
    .patch('/update/:id', verifyUser, fixedTermsController.updateFixedTermController)        // Actualizar un plazo fijo por ID
    .patch('/is-paid', verifyUser, fixedTermsController.updateIsPaidController)                //Marcar un plazo fijo como pago
    
export default router;