import express from 'express';
import transactionController from '../transaction/transactionController.js';

const router = express.Router();

router
.get('/account/:accountId', transactionController.getTransactionsByAccountIdController) // Obtener transacciones por ID de cuenta    
    .get('/:transactionId', transactionController.getTransactionByIdController)             // Obtener transaccion por id de transaccion
    .post('/', transactionController.createTransactionController)                           // Crear una nueva transacción
    .post('/filter', transactionController.filterTransactionsController)                    // Filtrar transacciones
    .patch('/is-paid', transactionController.updateIsPaidTransactionController)              //Marcar una transaccion como pagada
    .post('/future-transaction', transactionController.createFutureTransactionController)   // Crear una nueva transacción futura

export default router;