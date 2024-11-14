import emailService from "./emailService.js";

// Enviar un email
const sendEmail = async (req, res, next) => {
  const { to, subject, text } = req.body;

  try {
    const info = await emailService.sendEmailService(to, subject, text);
    return res.status(200).send(`Email enviado: ${info.response}`);
  } catch (error) {
    next(error);
  }
};

// Enviar mail por transferencia
const sendTransferEmail = async (req, res, next) => {
  const { to, amount, sourceAccountId, destinationAccountId } = req.body;

  try {
    await emailService.sendTransferEmailService(
      to,
      amount,
      sourceAccountId,
      destinationAccountId
    );
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};

export default { sendEmail, sendTransferEmail };
