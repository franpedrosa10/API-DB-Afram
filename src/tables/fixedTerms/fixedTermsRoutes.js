import express from 'express';
import fixedTermsController from '../fixedTerms/fixedTermsController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

router
    .get('/', verifyUser, fixedTermsController.getAllFixedTermsController)                   // Obtener todos los plazos fijos 
    .get('/:id', verifyUser, fixedTermsController.getFixedTermByIdController)                // Obtener plazo fijo por ID    
    .post('/', verifyUser, fixedTermsController.createFixedTermController)                   // Crear un nuevo plazo fijo      
    .patch('/update/:id', verifyUser, fixedTermsController.updateFixedTermController)        // Actualizar un plazo fijo por ID
    .get('/account/:account_id', verifyUser, fixedTermsController.getFixedTermsByAccountIdController)// Obtener plazos fijos por ID de usuario 
    .patch('/is-paid', verifyUser, fixedTermsController.updateIsPaidController)                //Marcar un plazo fijo como pago
    
export default router;