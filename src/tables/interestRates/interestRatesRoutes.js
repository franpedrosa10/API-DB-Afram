import express from 'express';
import interestRatesController from '../interestRates/interestRatesController.js';

const router = express.Router();

router
    .get('/', interestRatesController.getAllInterestRatesController)             // Obtener todas las tasas 
    .get('/id/:id', interestRatesController.getInterestRateByIdController)       // Obtener por ID 
    .post('/', interestRatesController.createInterestRateController)             // Crear una nueva tasa    
    .get('/latest', interestRatesController.getLatestInterestRateController)     // Obtener la última tasa
export default router;