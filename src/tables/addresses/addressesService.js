import knex from "../../database/knex.js";
const TABLE_NAME = "addresses";

// Obtener una dirección por ID
const getAddressById = async (id) => {
  try {
    console.log("ID recibido en servicio:", id);

    const parsedId = parseInt(id, 10);
    console.log("ID convertido (si aplica):", parsedId);

    const address = await knex(TABLE_NAME).where({ user_id: parsedId }).first();

    console.log("Resultado de la consulta:", address);

    return address || null;
  } catch (error) {
    console.error(`Error fetching address: ${error.message}`);
    throw new Error(`Error fetching address: ${error.message}`);
  }
};

// Crear una nueva dirección
const createAddress = async (addressData) => {
  const {
    street,
    address_number,
    floor,
    apartment,
    city,
    postal_code,
    country,
    user_id,
  } = addressData;

  console.log("Received data in service:", addressData);

  if (
    !street ||
    !address_number ||
    !city ||
    !postal_code ||
    !country ||
    !user_id
  ) {
    throw new Error("Missing required address fields");
  }

  try {
    await knex(TABLE_NAME).insert({
      street,
      address_number,
      floor,
      apartment,
      city,
      postal_code,
      country,
      user_id,
    });

    const newAddress = await knex(TABLE_NAME).where("user_id", user_id).first();

    console.log("New address retrieved:", newAddress);

    if (!newAddress || !newAddress.id) {
      throw new Error("Failed to retrieve new address ID");
    }

    return newAddress.id;
  } catch (error) {
    console.error(`Error creating address in service: ${error.message}`);
    throw new Error(`Service error: ${error.message}`);
  }
};

// Actualizar una dirección por ID del usuario
const updateAddressByUserId = async (user_id, addressData) => {
  try {
    if (!user_id) {
      throw new Error("User ID is required");
    }
    const updatedRows = await knex(TABLE_NAME)
      .where("user_id", user_id)
      .update(addressData);

    if (updatedRows === 0) {
      throw new Error("No address found for the provided user ID");
    }
    return true;
  } catch (error) {
    throw new Error(`Error updating address: ${error.message}`);
  }
};

// Obtener una dirección por ID de usuario
const getAddressByUserId = async (userId) => {
  console.log("user id :" + userId);
  try {
    if (!userId) throw new Error("User ID is required");

    const addresses = await knex(TABLE_NAME).where("user_id", userId).first();

    return addresses;
  } catch (error) {
    console.error(`Error fetching address: ${error.message}`);
    throw new Error(`Error fetching address: ${error.message}`);
  }
};

// Crear una dirección vacía por ID de usuario
const createEmptyAddress = async (user_id) => {
  console.log("Creating empty address for user_id:", user_id);

  if (!user_id) {
    throw new Error("User ID is required to create an address");
  }

  try {
    await knex(TABLE_NAME).insert({ user_id });

    const newAddress = await knex(TABLE_NAME)
      .where("user_id", user_id)
      .orderBy("id", "desc")
      .first();

    console.log("New empty address created:", newAddress);

    if (!newAddress || !newAddress.id) {
      throw new Error("Failed to retrieve new address ID");
    }

    return newAddress.id;
  } catch (error) {
    console.error(`Error creating empty address: ${error.message}`);
    throw new Error(`Error creating empty address: ${error.message}`);
  }
};

export default {
  getAddressById,
  createAddress,
  updateAddressByUserId,
  getAddressByUserId,
  createEmptyAddress,
};
