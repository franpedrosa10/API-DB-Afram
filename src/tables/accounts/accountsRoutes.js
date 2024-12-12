import express from 'express';
import accountController from '../accounts/accountsController.js';
import verifyUser from '../../middlewares/authUser.js';
// import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Retrieve a specific account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the account to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The account details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/{id}/balance:
 *   put:
 *     summary: Update the balance of a specific account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: double
 *                 description: The new balance for the account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /accounts/alias/{id}:
 *   put:
 *     summary: Update the alias of a specific account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the account to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 description: The new alias to assign to the account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Alias updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/deactivate:
 *   put:
 *     summary: Deactivate an account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: integer
 *                 description: The ID of the account to deactivate
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/alias/{alias}:
 *   get:
 *     summary: Retrieve account ID by alias
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *         description: The alias of the account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountId:
 *                   type: integer
 *                   description: The account ID associated with the alias
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/cbu/{cbu}:
 *   get:
 *     summary: Retrieve account ID by CBU
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: cbu
 *         required: true
 *         schema:
 *           type: string
 *         description: The CBU of the account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountId:
 *                   type: integer
 *                   description: The account ID associated with the CBU
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/dni-or-id/{identifier}:
 *   get:
 *     summary: Retrieve accounts by user ID or DNI
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID or DNI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accounts associated with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       404:
 *         description: No accounts found for the given identifier
 *       401:
 *         description: Unauthorized
 */

router
.get('/', verifyUser, accountController.getAllAccounts)                                 // Para obtener todas las cuentas 
.get('/:id', verifyUser, accountController.getAccount)                                  // Para obtener una cuenta específica
.put('/:id/balance', verifyUser, accountController.updateBalance)                        // Actualizar balance  
.post('/', accountController.createAccount)                                  // Para crear una nueva cuenta 
.put('/alias/:id', verifyUser, accountController.updateAccountAliasController)          // Para actualizar alias 
.put('/deactivate', verifyUser, accountController.deactivateAccount)                   // Para desactivar una cuenta 
.get('/alias/:alias', verifyUser,accountController.getAccountIdByAlias)                // Para obtener ID por alias 
.get('/cbu/:cbu', verifyUser ,accountController.getAccountIdByCBU)                      // Para obtener el id por CBU 
.get('/dni-or-id/:identifier', verifyUser, accountController.getAccountsController);    // Obtener cuentas por ID o DNI del usuario       


export default router;