import emailService from "./emailService.js";
import userService from "../user/userService.js";



// Enviar mail por transferencia
const sendTransferEmail = async (req, res, next) => {
  const { to, amount, sourceUserId, destinationUserId } = req.body;

  const sourceUser = await userService.getOneUser(sourceUserId);
  const destinationUser = await userService.getOneUser(destinationUserId);

  try {
    // Verificación de la existencia de los usuarios antes de continuar
    if (!sourceUser || !destinationUser) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Enviar el correo de la transferencia
    await emailService.sendTransferEmailService(
      to,
      amount,
      sourceUser,
      destinationUser
    );

    // Responder con éxito si no hay problemas
    return res.status(200).json(true);
  } catch (error) {
    // Manejo de error y respuesta según tipo
    console.error("Error al enviar correo:", error);
    
    // Responder con error 500 en caso de fallo interno
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Enviar correo de recuperación de contraseña con el token
const sendRecoveryToken = async (req, res, next) => {
  const { email } = req.body; // Obtén el correo desde el cuerpo de la solicitud

  try {
    // Verificar si el correo está presente en el request
    if (!email) {
      return res.status(400).json({ error: "El campo 'email' es obligatorio" });
    }

    // Verificar si el usuario existe en la base de datos por su email
    const id = await userService.getUserIdByEmail(email);
    if (!id) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Generar un token de recuperación
    const recoveryToken = await userService.generateRecoveryToken(id);

    if (!recoveryToken) {
      return res
        .status(500)
        .json({ error: "Error al generar el token de recuperación" });
    }

    // Enviar el correo con el token de recuperación
    await emailService.sendEmailWithToken(email, recoveryToken);

    // Responder con éxito
    return res.status(200).json(true);
  } catch (error) {
    console.error("Error en sendRecoveryToken:", error.message);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};


export default { sendTransferEmail, sendRecoveryToken };
