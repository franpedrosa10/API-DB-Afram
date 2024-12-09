import express from 'express';
import interestRatesController from '../interestRates/interestRatesController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

router
    .get('/',verifyUser, verifyRol("admin"), interestRatesController.getAllInterestRatesController)// Obtener todas las tasas 
    .get('/id/:id',verifyUser, interestRatesController.getInterestRateByIdController)        // Obtener por ID 
    .post('/', verifyUser , verifyRol('admin'), interestRatesController.createInterestRateController)// Crear una nueva tasa    
    .get('/latest',verifyUser, interestRatesController.getLatestInterestRateController)     // Obtener la última tasa

export default router;