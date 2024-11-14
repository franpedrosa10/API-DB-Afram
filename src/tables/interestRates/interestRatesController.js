import interestRatesService from "./interestRatesService.js";

// Obtener todas las tasas de interés
const getAllInterestRatesController = async (req, res, next) => {
  try {
    const rates = await interestRatesService.getAllInterestRates();
    return res.status(200).json(rates);
  } catch (error) {
    next(error);
  }
};

// Obtener una tasa de interés por ID
const getInterestRateByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rate = await interestRatesService.getInterestRateById(id);
    return res.status(200).json(rate);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva tasa de interés
const createInterestRateController = async (req, res, next) => {
  const rateData = req.body;

  try {
    const result = await interestRatesService.createInterestRate(rateData);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener la última tasa de interés
const getLatestInterestRateController = async (req, res, next) => {
  try {
    const latestRate = await interestRatesService.getLatestInterestRate();
    if (!latestRate) {
      return res
        .status(404)
        .json({ success: false, message: "No interest rate found" });
    }
    return res.status(200).json(latestRate);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllInterestRatesController,
  getInterestRateByIdController,
  createInterestRateController,
  getLatestInterestRateController,
};
