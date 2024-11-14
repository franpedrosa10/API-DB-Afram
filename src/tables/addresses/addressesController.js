import addressesService from "./addressesService.js";

// Obtener una dirección por ID
const getAddressByIdController = async (req, res, next) => {
  const { id } = req.params;
  console.log("ID recibido en controlador:", id);
  try {
    const address = await addressesService.getAddressById(id);
    if (!address) {
      console.warn("Dirección no encontrada");
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    return res.status(200).json(address);
  } catch (error) {
    console.error("Error en controlador:", error.message);
    next(error);
  }
};

// Crear una dirección
const createAddressController = async (req, res, next) => {
  const {
    street,
    address_number,
    city,
    postal_code,
    country,
    floor,
    apartment,
    user_id,
  } = req.body;

  console.log("Request Body in controller:", req.body);

  if (
    !street ||
    !address_number ||
    !city ||
    !postal_code ||
    !country ||
    !user_id
  ) {
    return res.status(400).json({ error: "Missing required address fields" });
  }

  try {
    const newAddressId = await addressesService.createAddress({
      street,
      address_number,
      floor,
      apartment,
      city,
      postal_code,
      country,
      user_id,
    });

    console.log("Address created with ID:", newAddressId);

    return res.status(201).json({ id: newAddressId });
  } catch (error) {
    console.error(`Controller error: ${error.message}`);
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Actualizar una dirección por ID
const updateAddressByUserIdController = async (req, res, next) => {
  const user_id = req.params.user_id;
  const addressData = req.body;
  try {
    const result = await addressesService.updateAddressByUserId(
      user_id,
      addressData
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener una dirección por ID de usuario
const getAddressByUserIdController = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const addresses = await addressesService.getAddressByUserId(user_id);
    if (!addresses) {
      return res
        .status(404)
        .json({ error: "Addresses not found for this user" });
    }
    return res.status(200).json(addresses);
  } catch (error) {
    console.error(`Error fetching addresses: ${error.message}`);
    return res.status(500).json({ error: "Server error" });
  }
};

// Crear una dirección vacía por ID de usuario
const createEmptyAddressController = async (req, res, next) => {
  const { user_id } = req.params;

  console.log("Request to create empty address with user_id:", user_id);

  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "User ID is required" });
  }

  try {
    const newAddressId = await addressesService.createEmptyAddress(user_id);

    console.log("Empty address created with ID:", newAddressId);
    return res.status(201).json({ success: true, id: newAddressId });
  } catch (error) {
    console.error(`Controller error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: `Server error: ${error.message}` });
  }
};

export default {
  getAddressByIdController,
  createAddressController,
  updateAddressByUserIdController,
  getAddressByUserIdController,
  createEmptyAddressController,
};
