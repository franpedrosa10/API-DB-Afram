import knex from "../../database/knex.js";
const TABLE_NAME = "cards";

// Obtener todas las tarjetas
const getAllCards = async () => {
  try {
    return await knex(TABLE_NAME).select("*");
  } catch (error) {
    throw new Error(`Error fetching cards: ${error.message}`);
  }
};

// Obtener una tarjeta por ID
const getCardById = async (cardId) => {
  try {
    const card = await knex(TABLE_NAME)
      .select("*")
      .where({ card_id: cardId })
      .first();
    return card || null;
  } catch (error) {
    throw new Error(`Error fetching card: ${error.message}`);
  }
};

// Crear una nueva tarjeta
const createCard = async (cardData) => {
  try {
    const user = await knex("users")
      .select("real_name", "last_name")
      .where("id", cardData.user_id)
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const cardWithUserData = {
      ...cardData,
      cardholder_name: user.real_name,
      cardholder_last_name: user.last_name,
      issue_date: new Date(),
    };

    await knex(TABLE_NAME).insert(cardWithUserData);

    const [cardId] = await knex(TABLE_NAME)
      .select("card_id")
      .orderBy("card_id", "desc")
      .limit(1);

    return cardId.card_id;
  } catch (error) {
    throw new Error(`Error creating card: ${error.message}`);
  }
};

// Dar de baja una tarjeta
const deactivateCard = async (card_id) => {
  try {
    const result = await knex(TABLE_NAME)
      .where({ card_id: card_id })
      .update({ is_Active: "no" });

    if (result === 0) {
      throw new Error("Card not found or already inactive");
    }

    return true;
  } catch (error) {
    throw new Error(`Error deactivating card: ${error.message}`);
  }
};

// Obtener tarjetas por usuario
const getCardsByUserId = async (userId) => {
  try {
    return await knex(TABLE_NAME).select("*").where({ user_id: userId });
  } catch (error) {
    throw new Error(`Error fetching cards for user: ${error.message}`);
  }
};

// Obtener tarjetas por ID de cuenta
const getCardsByAccountId = async (accountId) => {
  try {
    return await knex(TABLE_NAME).select("*").where({ account_id: accountId });
  } catch (error) {
    throw new Error(`Error fetching cards for account: ${error.message}`);
  }
};

export default {
  getAllCards,
  getCardById,
  createCard,
  deactivateCard,
  getCardsByUserId,
  getCardsByAccountId,
};
