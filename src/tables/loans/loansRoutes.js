import express from 'express';
import loansController from '../loans/loansController.js';

const router = express.Router();

router
        .get('/', loansController.getAllLoansController)                        // Obtener todos los préstamos 
        .get('/:loanId', loansController.getLoanByIdController)                 // Obtener préstamo por ID     
        .post('/', loansController.createLoanController)                        // Crear un nuevo préstamo     
        .get('/account/:account_id', loansController.getLoansByAccountIdController) // Obtener prestamos por ID de cuenta  
        .patch('/update-paid/:id', loansController.updatePaidController)  // Actualizar el campo "paid" de un préstamo

export default router;