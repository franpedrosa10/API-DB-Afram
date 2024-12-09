import express from 'express';
import userController from '../user/userController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';


const router = express.Router();

router
    .get('/', verifyUser , verifyRol('admin'), userController.getAllUsers)      // Obtener todos los usuarios
    .get('/:userId', userController.getOneUser) // Obtener un usuario específico
    .post('/register', verifyUser, userController.createUser)                           // Crear un nuevo usuario sin email ni telefono
    .post('/register-complete', verifyUser , verifyRol('admin'), userController.createUserComplete)// Crear un usuario completo
    .put('/update/:id', verifyUser , userController.updateUser)  // Actualizar teléfono y email de un usuario
    .post('/verify', userController.verifyUser)                             // Verificar usuario, dni y contraseña
    .put('/change-password/:id', verifyUser, userController.changePassword) // Cambiar la contraseña
    .post('/toggle-user-status/:id', verifyUser , verifyRol('admin'), userController.toggleUserStatus)// Dar de alta o baja un usuario
    .post('/toggle-admin-status/:id', verifyUser , verifyRol('admin'), userController.toggleUserAdminStatus) // Cambiar a admin o user
    .get('/id/:dni', userController.getUserIdByDNI)                         // Obtener ID de usuario por dni
    .get('/email/:email', userController.getUserIdByEmailController)        // Obtener Id por email
    .put('/change-password-by-id/:id', userController.changePasswordById)   // Cambiar la contraseña con el token
    .get('/reset-token/:token', userController.getUserIdByResetToken)       // Obtener id por token
    .patch("/unblock", userController.unblockUser)                          // Cambia el campo login_attempts  a 0
    .patch("/block", userController.blockUser)                              // Sube login_attempts en 1


export default router;

