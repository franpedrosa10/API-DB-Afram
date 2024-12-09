import express from 'express';
import transactionController from '../transaction/transactionController.js';
import verifyUser from '../../middlewares/authUser.js';


const router = express.Router();

router
    .get('/account/:accountId', verifyUser, transactionController.getTransactionsByAccountIdController) // Obtener transacciones por ID de cuenta    
    .get('/:transactionId', verifyUser, transactionController.getTransactionByIdController)             // Obtener transaccion por id de transaccion
    .post('/', verifyUser, transactionController.createTransactionController)                           // Crear una nueva transacción
    .post('/filter', verifyUser, transactionController.filterTransactionsController)                                // Filtrar transacciones
    .patch('/is-paid', verifyUser, transactionController.updateIsPaidTransactionController)                         //Marcar una transaccion como pagada
    .post('/future-transaction', verifyUser, transactionController.createFutureTransactionController)   // Crear una nueva transacción futura
    .delete("/:id", verifyUser, transactionController.deleteTransaction)                                            // Borra una transaccion por id 

export default router;