import express from 'express';
import addressesController from '../addresses/addressesController.js';

const router = express.Router();

router
    .get('/:id', addressesController.getAddressByIdController)                      // Obtener dirección por ID
    .post('/', addressesController.createAddressController)                         // Crear una nueva dirección
    .patch('/user/:user_id', addressesController.updateAddressByUserIdController)   // Actualizar dirección por ID
    .get('/user/:user_id', addressesController.getAddressByUserIdController)        // Obtener dirección por ID de usuario
    .post('/create/:user_id', addressesController.createEmptyAddressController)     //Crea una direccion solo con el user_id

export default router;
