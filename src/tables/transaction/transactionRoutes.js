import express from 'express';
import transactionController from '../transaction/transactionController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

/**
 * @swagger
 * /account/{accountId}:
 *   get:
 *     summary: Get transactions by account ID
 *     parameters:
 *       - name: accountId
 *         in: path
 *         description: Account ID to get transactions from
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of transactions
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /{transactionId}:
 *   get:
 *     summary: Get transaction by transaction ID
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         description: Transaction ID to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 *       400:
 *         description: Invalid transaction ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               source_account_id:
 *                 type: string
 *               destination_account_id:
 *                 type: string
 *               transaction_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Bad request, missing parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /filter:
 *   post:
 *     summary: Filter transactions based on parameters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               minAmount:
 *                 type: number
 *               maxAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Filtered list of transactions
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /future-transaction:
 *   post:
 *     summary: Create a future transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               source_account_id:
 *                 type: string
 *               destination_account_id:
 *                 type: string
 *               transaction_type:
 *                 type: string
 *               transaction_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Future transaction created
 *       400:
 *         description: Bad request, missing parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /is-paid:
 *   patch:
 *     summary: Mark a transaction as paid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction marked as paid
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transaction ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router
    .get('/account/:accountId', verifyUser, transactionController.getTransactionsByAccountIdController) // Obtener transacciones por ID de cuenta    
    .get('/:transactionId', verifyUser, transactionController.getTransactionByIdController)             // Obtener transaccion por id de transaccion
    .post('/', verifyUser, transactionController.createTransactionController)                           // Crear una nueva transacción
    .post('/filter', verifyUser, transactionController.filterTransactionsController)                                // Filtrar transacciones
    .post('/future-transaction', verifyUser, transactionController.createFutureTransactionController)   // Crear una nueva transacción futura
    .patch('/is-paid', verifyUser, transactionController.updateIsPaidTransactionController)                         //Marcar una transaccion como pagada
    .delete("/:id", verifyUser, transactionController.deleteTransaction)                                            // Borra una transaccion por id 

export default router;