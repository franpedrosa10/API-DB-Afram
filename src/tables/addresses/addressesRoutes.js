import express from 'express';
import addressesController from '../addresses/addressesController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

router
    .get('/:id', verifyUser, addressesController.getAddressByIdController)                      // Obtener dirección por ID
    .post('/', verifyUser, addressesController.createAddressController)                         // Crear una nueva dirección
    .patch('/user/:user_id', verifyUser, addressesController.updateAddressByUserIdController)   // Actualizar dirección por ID
    .get('/user/:user_id', verifyUser, addressesController.getAddressByUserIdController)        // Obtener dirección por ID de usuario
    .post('/create/:user_id', addressesController.createEmptyAddressController)                 //Crea una direccion solo con el user_id

export default router;
