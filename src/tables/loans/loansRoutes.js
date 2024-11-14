import express from 'express';
import loansController from '../loans/loansController.js';

const router = express.Router();

router
        .get('/', loansController.getAllLoansController)                        // Obtener todos los préstamos 
        .get('/:loanId', loansController.getLoanByIdController)                 // Obtener préstamo por ID     
        .post('/', loansController.createLoanController)                        // Crear un nuevo préstamo     
        .patch('/:loanId/addPaid', loansController.updateLoanController)        // Actualizar un préstamo por ID 

export default router;