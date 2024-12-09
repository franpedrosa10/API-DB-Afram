import express from 'express';
import loansController from '../loans/loansController.js';
import verifyUser from '../../middlewares/authUser.js';

const router = express.Router();

router
        .get('/',verifyUser, loansController.getAllLoansController)                        // Obtener todos los préstamos 
        .get('/:loanId',verifyUser, loansController.getLoanByIdController)                 // Obtener préstamo por ID     
        .post('/', verifyUser, loansController.createLoanController)                        // Crear un nuevo préstamo     
        .get('/account/:account_id', verifyUser, loansController.getLoansByAccountIdController) // Obtener prestamos por ID de cuenta  
        .patch('/update-paid/:id', verifyUser, loansController.updatePaidController)       // Actualizar el campo "paid" de un préstamo

export default router;