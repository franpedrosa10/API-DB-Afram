import emailService from "./emailService.js";
import userService from "../user/userService.js";



// Enviar mail por transferencia
const sendTransferEmail = async (req, res, next) => {
  const { to, amount, sourceUserId, destinationUserId } = req.body;

  const sourceUser = await userService.getOneUser(sourceUserId);
  const destinationUser = await userService.getOneUser(destinationUserId);

  try {
    await emailService.sendTransferEmailService(
      to,
      amount,
      sourceUser,
      destinationUser
    );
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
};

// Enviar correo de recuperación de contraseña con el token
const sendRecoveryToken = async (req, res, next) => {
  const { email }  = req.body;  // Obtén el correo desde el cuerpo de la solicitud

  try {
    // Verificar si el usuario existe en la base de datos por su email
    const id = await userService.getUserIdByEmail(email);
    if (!id) {
      return res.status(404).json(false);
    }

    // Generar un token de recuperación, puede ser un JWT o cualquier otro método
    const  recoveryToken = await userService.generateRecoveryToken(id);  // Implementa esta función según tus necesidades

    // Enviar el correo con el token de recuperación
    await emailService.sendEmailWithToken(email, recoveryToken);

    return res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};

export default { sendTransferEmail, sendRecoveryToken };
