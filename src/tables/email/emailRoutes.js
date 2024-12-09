import express from 'express';
import emailController from '../email/emailController.js';
import verifyUser from '../../middlewares/authUser.js';


const router = express.Router();

router.post("/send-transfer", verifyUser, emailController.sendTransferEmail);    // Enviar mail por transferencia
router.post("/send-recover", emailController.sendRecoveryToken)  //Enviar mail para recuperar contrasena

export default router;
