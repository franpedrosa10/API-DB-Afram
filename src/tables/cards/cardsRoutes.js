import express from 'express';
import cardController from '../cards/cardsController.js';
import verifyUser from '../../middlewares/authUser.js';


const router = express.Router();

router
    .get('/', verifyUser, cardController.getAllCardsController)                             // Obtener todas las tarjetas 
    .get('/:cardId', verifyUser, cardController.getCardByIdController)                      // Obtener tarjeta por ID 
    .post('/', verifyUser, cardController.createCardController)                             // Crear una nueva tarjeta 
    .put('/deactivate', verifyUser, cardController.deactivateCardController)                // Dar de baja tarjeta 
    .get('/user/:userId', verifyUser, cardController.getCardsByUserIdController)            // Obtener tarjetas por usuario 
    .get('/account/:accountId', verifyUser, cardController.getCardsByAccountIdController)   // Obtener tarjetas por ID de cuenta 

export default router;