import usersService from "./userService.js";
import accountsService from "../accounts/accountsService.js";
import emailService from "../email/emailService.js";


// Obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const result = await usersService.getAllUsers();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID
const getOneUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    const result = await usersService.getOneUser(parseInt(userId));
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Crear un usuario sin mail ni telefono
const createUser = async (req, res, next) => {
  const usuario = req.body;
  try {
    const result = await usersService.createUser(usuario);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Crear un usuario completo
const createUserComplete = async (req, res, next) => {
  const usuario = req.body;
  try {
    const result = await usersService.createUserComplete(usuario);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Actualizar teléfono, dirección y email de un usuario
const updateUser = async (req, res, next) => {
  const {
    params: { id },
    body: user,
  } = req;
  try {
    const updatedUser = await usersService.updateUser(parseInt(id), user);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Verificar usuario, dni y contraseña
const verifyUser = async (req, res, next) => {
  const {
    body: { username, dni, password },
  } = req;
  try {
    const result = await usersService.verifyUser(username, dni, password);
    if (!result) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


// Cambiar contraseña
const changePassword = async (req, res, next) => {
  const {
    params: { id },
    body: { currentPassword, newPassword },
  } = req;
  try {
    const result = await usersService.changePassword(
      parseInt(id),
      currentPassword,
      newPassword
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Dar de alta o baja un usuario
const toggleUserStatus = async (req, res, next) => {
  const userId = req.params.id;
  const { isActive } = req.body;

  const accounts = await accountsService.getAccountsByUserIdOrDni(userId);
accounts.forEach(account => {
   accountsService.deactivateAccount(account.id);
});


  try {
    const result = await usersService.toggleUserStatus(userId, isActive);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Cambiar a admin o user
const toggleUserAdminStatus = async (req, res, next) => {
  const userId = req.params.id;
  const { userType } = req.body;

  try {
    const result = await usersService.toggleUserAdminStatus(userId, userType);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener ID de usuario por DNI
const getUserIdByDNI = async (req, res, next) => {
  const {
    params: { dni },
  } = req;
  try {
    const userId = await usersService.getUserIdByDNI(dni);

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userId);
  } catch (error) {
    next(error);
  }
};

const getUserIdByEmailController = async (req, res, next) => {
  const {
    params: { email },
  } = req;
  try {
    const result = await usersService.getUserIdByEmail(email);
    if (!result.id) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(result.id);
  } catch (error) {
    next(error);
  }
};

// Cambiar contraseña
const changePasswordById = async (req, res, next) => {
  const {
    params: { id },
    body: { newPassword },
  } = req;
  try {
    const result = await usersService.changePasswordById(
      id,
      newPassword
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserIdByResetToken = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json(false);
  }

  try {

    const userId = await usersService.getUserIdByToken(token);

    if (!userId) {
      return res.status(404).json(false);
    }

    return res.status(200).json(userId); // Devuelve el ID del usuario si el token es válido
  } catch (error) {
    console.error("Error al obtener el ID del usuario por token: ", error);
    return res.status(500).json(false);
  }
};

// Cambiar el estado de is_blocked a partir del DNI
export const toggleUserBlockedStatus = async (req, res) => {
  try {
    const { dni } = req.params; // DNI en la URL
    const { is_blocked } = req.body; // Valor de 'isBlocked' en el cuerpo de la solicitud

    if (!["yes", "no"].includes(is_blocked)) {
      return res.status(400).json({
        message: "Invalid value for is_blocked. Use 'yes' or 'no'.",
      });
    }

    const result = await usersService.toggleUserBlockedStatusByDNI(dni, is_blocked);
    const id = await usersService.getUserIdByDNI(dni);
    const email = await usersService.getOneUser(id);
    const token = await usersService.generateRecoveryToken(id);
    const sendEmail = await emailService.sendEmailWithToken(email, token)

    if (!result) {
      return res.status(404).json(false);
    }

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({
      message: `Error updating user's blocked status: ${error.message}`,
    });
  }
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  createUserComplete,
  updateUser,
  verifyUser,
  changePassword,
  toggleUserStatus,
  toggleUserAdminStatus,
  getUserIdByDNI,
  getUserIdByEmailController,
  changePasswordById,
  getUserIdByResetToken,
  toggleUserBlockedStatus
};
