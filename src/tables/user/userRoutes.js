import express from 'express';
import userController from '../user/userController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users. Admin role required.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a specific user
 *     description: Fetches a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user (without email or phone)
 *     description: Create a new user without email and phone.
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user ID by email
 *     description: Returns user ID by email.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User ID
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/id/{dni}:
 *   get:
 *     summary: Get user ID by DNI
 *     description: Returns user ID by DNI.
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: The DNI of the user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User ID
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/reset-token/{token}:
 *   get:
 *     summary: Get user ID by reset token
 *     description: Fetch user ID using reset token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User ID
 *       404:
 *         description: Token invalid or user not found
 */

/**
 * @swagger
 * /users/register-complete:
 *   post:
 *     summary: Register a complete user (admin required)
 *     description: Create a complete user (with email and phone).
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/verify:
 *   post:
 *     summary: Verify user by username, DNI, and password
 *     description: Verifies user using username, DNI, and password.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User verified successfully
 *       401:
 *         description: Incorrect credentials
 */

/**
 * @swagger
 * /users/toggle-user-status/{id}:
 *   post:
 *     summary: Toggle user status (admin required)
 *     description: Activate or deactivate a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Status updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/toggle-admin-status/{id}:
 *   post:
 *     summary: Change user role (admin required)
 *     description: Switch a user between admin and regular roles.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Role updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update phone and email for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/change-password/{id}:
 *   put:
 *     summary: Change user password
 *     description: Change the password for a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /users/change-password-by-id/{id}:
 *   put:
 *     summary: Change password by ID
 *     description: Change the password using the user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/unblock:
 *   patch:
 *     summary: Unblock user
 *     description: Reset the login attempts to 0 for the user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/block:
 *   patch:
 *     summary: Block user
 *     description: Increment the login attempts for the user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       404:
 *         description: User not found
 */
router
    .get('/', verifyUser , verifyRol('admin'), userController.getAllUsers)      // Obtener todos los usuarios
    .get('/:userId', userController.getOneUser) // Obtener un usuario específico
    .post('/register', userController.createUser)                           // Crear un nuevo usuario sin email ni telefono
    .get('/email/:email', userController.getUserIdByEmailController)        // Obtener Id por email
    .get('/id/:dni', userController.getUserIdByDNI)                         // Obtener ID de usuario por dni
    .get('/reset-token/:token', userController.getUserIdByResetToken)       // Obtener id por token
    .post('/register-complete', verifyUser , verifyRol('admin'), userController.createUserComplete)// Crear un usuario completo
    .post('/verify', userController.verifyUser)                             // Verificar usuario, dni y contraseña
    .post('/toggle-user-status/:id', verifyUser , verifyRol('admin'), userController.toggleUserStatus)// Dar de alta o baja un usuario
    .post('/toggle-admin-status/:id', verifyUser , verifyRol('admin'), userController.toggleUserAdminStatus) // Cambiar a admin o user
    .put('/update/:id', verifyUser , userController.updateUser)          // Actualizar teléfono y email de un usuario
    .put('/change-password/:id', verifyUser, userController.changePassword) // Cambiar la contraseña
    .put('/change-password-by-id/:id', userController.changePasswordById)   // Cambiar la contraseña con el token
    .patch("/unblock", userController.unblockUser)                          // Cambia el campo login_attempts  a 0
    .patch("/block", userController.blockUser)                              // Sube login_attempts en 1


export default router;

