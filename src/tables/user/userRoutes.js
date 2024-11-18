import express from 'express';
import userController from '../user/userController.js';

const router = express.Router();

router
    .get('/', userController.getAllUsers)                                   // Obtener todos los usuarios
    .get('/:userId', userController.getOneUser)                             // Oobtener un usuario específico
    .post('/register', userController.createUser)                           // Crear un nuevo usuario
    .put('/update/:id', userController.updateUser)                          // Actualizar teléfono, dirección y email de un usuario
    .post('/verify', userController.verifyUser)                             // Verificar usuario, dni y contraseña
    .put('/change-password/:id', userController.changePassword)             // Cambiar la contraseña
    .post('/toggle-user-status/:id', userController.toggleUserStatus)       // Dar de alta o baja un usuario
    .post('/toggle-admin-status/:id', userController.toggleUserAdminStatus) // Cambiar a admin o user
    .get('/id/:dni', userController.getUserIdByDNI)                         // Obtener ID de usuario por dni
    .get('/email/:email', userController.getUserIdByEmailController)        // Obtener Id por email
    .put('/change-password-by-id/:id', userController.changePasswordById)   // Cambiar la contraseña con el token
    .get('/reset-token/:token', userController.getUserIdByResetToken); 


export default router;

