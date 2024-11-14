import cardsService from "./cardsService.js";

// Obtener todas las tarjetas
const getAllCardsController = async (req, res, next) => {
  try {
    const cards = await cardsService.getAllCards();
    return res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

// Obtener tarjeta por ID
const getCardByIdController = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await cardsService.getCardById(cardId);
    if (!card) {
      return res
        .status(404)
        .json({ success: false, message: "Card not found" });
    }
    return res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};

// Crear tarjeta
const createCardController = async (req, res, next) => {
  const cardData = req.body;
  try {
    const result = await cardsService.createCard(cardData);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Dar de baja una tarjeta
const deactivateCardController = async (req, res, next) => {
  const {card_id}  = req.body;

  console.log('CARD ID: '+card_id);

  try {
    const result = await cardsService.deactivateCard(card_id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener tarjetas por usuario
const getCardsByUserIdController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cards = await cardsService.getCardsByUserId(userId);
    return res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

// Obtener tarjetas por ID de cuenta
const getCardsByAccountIdController = async (req, res, next) => {
  const { accountId } = req.params;
  try {
    const cards = await cardsService.getCardsByAccountId(accountId);
    return res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCardsController,
  getCardByIdController,
  createCardController,
  deactivateCardController,
  getCardsByUserIdController,
  getCardsByAccountIdController,
};
