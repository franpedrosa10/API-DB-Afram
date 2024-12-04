import knex from "../../database/knex.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; 
const TABLE_NAME = "Users";

// Obtener todos los usuarios
const getAllUsers = async () => {
  const users = await knex(TABLE_NAME)
    .select()
    .orderBy(['real_name', 'last_name'], ['asc', 'asc']); 
  return users;
};

// Obtener un usuario por ID
const getOneUser = async (userId) => {
  const user = await knex(TABLE_NAME).select().where("id", userId).first();

  if (!user) {
    return false;
  }

  return user;
};

// Crear un usuario con email random
const createUser = async (user) => {
  try {
    if (!user.hashed_password) {
      throw new Error("Password is required");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.hashed_password, saltRounds);

    const lastUser = await knex(TABLE_NAME).select('id').orderBy('id','desc').first();
    const newId = lastUser.id + 1;

    await knex(TABLE_NAME).insert({
      name_user: user.name_user,
      last_name: user.last_name,
      email: "example"+newId+"@example.com",
      hashed_password: hashedPassword,
      dni: user.dni,
      phone: "",
      user_type: user.user_type || "user",
      is_Active: user.is_Active || "yes",
      real_name: user.real_name,
    });

    const newUser = await knex(TABLE_NAME).where("dni", user.dni).first();

    return newUser.id;
  } catch (error) {
    throw error;
  }
};

// Crear un usuario completo
const createUserComplete = async (user) => {
  try {
    if (!user.hashed_password) {
      throw new Error("Password is required");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.hashed_password, saltRounds);

    const lastUser = await knex(TABLE_NAME).select('id').orderBy('id','desc').first();
    const newId = lastUser.id + 1;

    await knex(TABLE_NAME).insert({
      name_user: user.name_user,
      last_name: user.last_name,
      email: user.email,
      hashed_password: hashedPassword,
      dni: user.dni,
      phone: user.phone,
      user_type: user.user_type || "user",
      is_Active: user.is_Active || "yes",
      real_name: user.real_name,
    });

    const newUser = await knex(TABLE_NAME).where("dni", user.dni).first();

    return newUser.id;
  } catch (error) {
    throw error;
  }
};

// Actualizar teléfono, dirección y email de un usuario
const updateUser = async (id, user) => {
  try {
    const existingUser = await knex(TABLE_NAME).where({ id }).first();

    if (!existingUser) {
      return null;
    }

    const emailInUse = await knex(TABLE_NAME)
      .where("email", user.email)
      .andWhere("id", "!=", id)
      .first();

    if (emailInUse) {
      throw new Error(
        "Este correo electrónico ya está en uso por otro usuario."
      );
    }

    const updatedRows = await knex(TABLE_NAME).where({ id }).update({
      phone: user.phone,
      email: user.email,
    });

    if (updatedRows === 0) {
      return null;
    }

    const updatedUser = await knex(TABLE_NAME).where({ id }).first();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Verificar usuario, dni y contraseña
const verifyUser = async (username, dni, password) => {
  console.log("Username:", username, "DNI:", dni);
  try {
    const user = await knex(TABLE_NAME)
      .where({ name_user: username, dni })
      .first();

    if (user && (await bcrypt.compare(password, user.hashed_password))) {
      return user.id;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

// Cambiar contraseña
const changePassword = async (id, currentPassword, newPassword) => {
  try {
    const user = await knex(TABLE_NAME).where({ id }).first();

    if (
      !user ||
      !(await bcrypt.compare(currentPassword, user.hashed_password))
    ) {
      throw new Error("Current password is incorrect");
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await knex(TABLE_NAME)
      .where({ id })
      .update({ hashed_password: hashedNewPassword });

    return true;
  } catch (error) {
    throw error;
  }
};

// Dar de alta o baja un usuario
const toggleUserStatus = async (userId, isActive) => {
  try {
    if (!["yes", "no"].includes(isActive)) {
      throw new Error("Invalid value for isActive. Use 'yes' or 'no'.");
    }

    const rowsUpdated = await knex(TABLE_NAME).where("id", userId).update({
      is_Active: isActive,
    });

    if (rowsUpdated === 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Cambiar a admin o user
const toggleUserAdminStatus = async (userId, userType) => {
  try {
    if (!["admin", "user"].includes(userType)) {
      throw new Error("Invalid value for userType. Use 'admin' or 'user'.");
    }

    const rowsUpdated = await knex(TABLE_NAME).where("id", userId).update({
      user_type: userType,
    });

    if (rowsUpdated === 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Obtener ID de usuario por DNI
const getUserIdByDNI = async (dni) => {
  const user = await knex(TABLE_NAME).select("id").where("dni", dni).first();

  if (!user) {
    return false;
  }

  return user.id;
};


// Obtener ID de usuario por correo electrónico
const getUserIdByEmail = async (email) => {
  try {
    const user_id = await knex(TABLE_NAME)
      .select("id") 
      .where({ email }) // Usamos el email como criterio de búsqueda
      .first(); // Aseguramos que solo se devuelva un registro

    if (!user_id) {
      // Si no se encuentra el usuario, retornamos null o un valor apropiado
      return null;
    }

    return user_id; // Retornamos el ID del usuario
  } catch (error) {
    throw new Error(`Error fetching user by email: ${error.message}`);
  }
};


// Cambiar contraseña por token
const changePasswordById = async (id, newPassword) => {
  try {
    // Generar un hash de la nueva contraseña
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar la contraseña en la base de datos
    await knex(TABLE_NAME)
      .where({ id })
      .update({ hashed_password: hashedNewPassword });

    // Poner el reset_token en null después de cambiar la contraseña
    await knex(TABLE_NAME)
      .where({ id })
      .update({ reset_token: null });

    return true;  // Retorna true si todo sale bien
  } catch (error) {
    throw error;
  }
};

// Obtener ID de usuario por token de reseteo
const getUserIdByToken = async (resetToken) => {
  try {
    const user = await knex(TABLE_NAME)
      .select("id")
      .where("reset_token", resetToken)
      .first();

    if (!user) {
      return false; // Si no se encuentra el usuario, se retorna false
    }

    return user.id; // Devuelve el ID del usuario
  } catch (error) {
    throw error; // Si ocurre algún error, se lanza
  }
};



// Generar un token de recuperación de 6 dígitos y guardarlo en la base de datos
const generateRecoveryToken = async (id) => {
  try {

    const token = crypto.randomInt(100000, 999999).toString(); 

    console.log("Adentro del token: ",token)
    console.log("Id del pebete: ",id)

   
    const rowsUpdated = await knex(TABLE_NAME)
    .where({ id }) // Aquí "id" es tanto el nombre de la columna como el valor de la variable.
    .update({ reset_token: token });
      
      if (rowsUpdated === 0) {
        return false; 
      } 
    

    return token; 
  } catch (error) {
    throw new Error(`Error al generar el token: ${error.message}`); 
  }
};

// Cambiar el estado de is_blocked a partir del DNI
const toggleUserBlockedStatusByDNI = async (dni, isBlocked) => {
  try {
    if (!["yes", "no"].includes(isBlocked)) {
      throw new Error("Invalid value for is_blocked. Use 'yes' or 'no'.");
    }

    const user = await knex(TABLE_NAME).where({ dni }).first();

    if (!user) {
      throw new Error("User with the provided DNI does not exist.");
    }

    const rowsUpdated = await knex(TABLE_NAME)
      .where( "dni", dni )
      .update( { is_blocked : isBlocked });

    if (rowsUpdated === 0) {
      return false; 
    }

    return true; 
  } catch (error) {
    throw new Error(`Error updating is_blocked status: ${error.message}`);
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
  getUserIdByEmail,
  changePasswordById,
  getUserIdByToken,
  generateRecoveryToken,
  toggleUserBlockedStatusByDNI
};
