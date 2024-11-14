import express from 'express';
import emailController from '../email/emailController.js';

const router = express.Router();

router.post("/send", emailController.sendEmail);                    // Enviar un email
router.post("/sendtransfer", emailController.sendTransferEmail);    // Enviar mail por transferencia

export default router;
