import knex from "../../database/knex.js";
const TABLE_NAME = "InterestRates";

// Obtener todas las tasas de interés
const getAllInterestRates = async () => {
  try {
    return await knex(TABLE_NAME).select("*").orderBy("last_updated", "desc");
  } catch (error) {
    throw new Error(`Error fetching interest rates: ${error.message}`);
  }
};

// Obtener una tasa de interés por ID
const getInterestRateById = async (id) => {
  try {
    const rate = await knex(TABLE_NAME).where({ id }).first();
    if (!rate) {
      throw new Error("Interest rate not found");
    }
    return rate;
  } catch (error) {
    throw new Error(`Error fetching interest rate: ${error.message}`);
  }
};

// Crear una nueva tasa de interés
const createInterestRate = async (rateData) => {
  try {
    const { loan_interest_rate, fixed_term_interest_rate } = rateData;

    await knex(TABLE_NAME).insert({
      loan_interest_rate,
      fixed_term_interest_rate,
      last_updated: new Date(),
    });

    return true;
  } catch (error) {
    throw new Error(`Error creating interest rate: ${error.message}`);
  }
};

// Obtener la última tasa de interés cargada
const getLatestInterestRate = async () => {
  try {
    const latestRate = await knex(TABLE_NAME).orderBy("id", "desc").first();
    return latestRate || null;
  } catch (error) {
    throw new Error(`Error fetching latest interest rate: ${error.message}`);
  }
};
export default {
  getAllInterestRates,
  getInterestRateById,
  createInterestRate,
  getLatestInterestRate,
};
