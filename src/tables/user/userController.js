import usersService from "./userService.js";

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

// Crear un usuario
const createUser = async (req, res, next) => {
  const usuario = req.body;
  try {
    const result = await usersService.createUser(usuario);
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

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  verifyUser,
  changePassword,
  toggleUserStatus,
  toggleUserAdminStatus,
  getUserIdByDNI,
};
