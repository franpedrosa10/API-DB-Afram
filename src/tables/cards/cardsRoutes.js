import express from 'express';
import cardController from '../cards/cardsController.js';

const router = express.Router();

router
    .get('/', cardController.getAllCardsController)                             // Obtener todas las tarjetas 
    .get('/:cardId', cardController.getCardByIdController)                      // Obtener tarjeta por ID 
    .post('/', cardController.createCardController)                             // Crear una nueva tarjeta 
    .put('/deactivate', cardController.deactivateCardController)                // Dar de baja tarjeta 
    .get('/user/:userId', cardController.getCardsByUserIdController)            // Obtener tarjetas por usuario 
    .get('/account/:accountId', cardController.getCardsByAccountIdController)   // Obtener tarjetas por ID de cuenta 

export default router;