import express from 'express';
import transactionController from '../transaction/transactionController.js';

const router = express.Router();

router
    .get('/:transactionId', transactionController.getTransactionByIdController)             // Obtener transaccion por id de transaccion
    .get('/account/:accountId', transactionController.getTransactionsByAccountIdController) // Obtener transacciones por ID de cuenta    
    .post('/', transactionController.createTransactionController)                           // Crear una nueva transacción
    .post('/filter', transactionController.filterTransactionsController)                    // Filtrar transacciones

export default router;