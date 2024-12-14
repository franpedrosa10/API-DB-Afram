import express from 'express';
import loansController from '../loans/loansController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Retrieve all loans
 *     tags: [Loans]
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
 *         description: A list of all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /loans/{loanId}:
 *   get:
 *     summary: Retrieve a loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the loan to retrieve
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
 *         description: The loan details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Loan not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /loans/account/{account_id}:
 *   get:
 *     summary: Retrieve loans by account ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: account_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID to retrieve loans
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
 *         description: A list of loans for the account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       404:
 *         description: No loans found for this account
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
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
 *               amount:
 *                 type: integer
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               account_id:
 *                 type: integer
 *               interest_rate_id:
 *                 type: integer
 *               return_amount:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       201:
 *         description: The created loan ID
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /loans/update-paid/{id}:
 *   patch:
 *     summary: Update the "paid" field of a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the loan to update
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
 *               amount:
 *                 type: integer
 *                 description: The amount to add to the "paid" field
 *     responses:
 *       200:
 *         description: Loan paid amount updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Loan not found or update failed
 *       401:
 *         description: Unauthorized
 */

router
        .get('/',verifyUser, loansController.getAllLoansController)                        // Obtener todos los préstamos 
        .get('/:loanId',verifyUser, loansController.getLoanByIdController)                 // Obtener préstamo por ID     
        .get('/account/:account_id', verifyUser, loansController.getLoansByAccountIdController) // Obtener prestamos por ID de cuenta  
        .post('/', verifyUser, loansController.createLoanController)                        // Crear un nuevo préstamo     
        .patch('/update-paid/:id', verifyUser, loansController.updatePaidController)       // Actualizar el campo "paid" de un préstamo

export default router;