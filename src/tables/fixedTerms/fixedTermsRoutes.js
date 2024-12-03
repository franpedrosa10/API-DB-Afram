import express from 'express';
import fixedTermsController from '../fixedTerms/fixedTermsController.js';

const router = express.Router();

router
    .get('/', fixedTermsController.getAllFixedTermsController)                   // Obtener todos los plazos fijos 
    .get('/:id', fixedTermsController.getFixedTermByIdController)                // Obtener plazo fijo por ID    
    .post('/', fixedTermsController.createFixedTermController)                   // Crear un nuevo plazo fijo      
    .patch('/update/:id', fixedTermsController.updateFixedTermController)               // Actualizar un plazo fijo por ID
    .get('/account/:account_id', fixedTermsController.getFixedTermsByAccountIdController)// Obtener plazos fijos por ID de usuario 
    .patch('/is-paid', fixedTermsController.updateIsPaidController)                //Marcar un plazo fijo como pago
    
export default router;