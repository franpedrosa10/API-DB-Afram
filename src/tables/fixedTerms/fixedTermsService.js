import knex from "../../database/knex.js";
const TABLE_NAME = "FixedTerms";

// Obtener todos los plazos fijos
const getAllFixedTerms = async () => {
  try {
    return await knex(TABLE_NAME).select("*");
  } catch (error) {
    throw new Error(`Error fetching fixed terms: ${error.message}`);
  }
};

// Obtener un plazo fijo por ID
const getFixedTermById = async (id) => {
  try {
    const fixedTerm = await knex(TABLE_NAME).where({ id }).first();
    return fixedTerm || null;
  } catch (error) {
    throw new Error(`Error fetching fixed term: ${error.message}`);
  }
};

// Crear un nuevo plazo fijo
const createFixedTerm = async (fixedTermData) => {
  try {
    return await knex("FixedTerms").insert(fixedTermData);
  } catch (error) {
    throw new Error(`Error creating fixed term: ${error.message}`);
  }
};

// Actualizar un plazo fijo por ID
const updateFixedTerm = async (id, updatedData) => {
  try {
    await knex(TABLE_NAME).where({ id }).update(updatedData);
    return true;
  } catch (error) {
    throw new Error(`Error updating fixed term: ${error.message}`);
  }
};

// Obtener plazos fijos por ID de cuenta
const getFixedTermsByAccountId = async (accountId) => {
  try {
    return await knex(TABLE_NAME).where({ account_id: accountId });
  } catch (error) {
    throw new Error(`Error fetching by  ID: ${error.message}`);
  }
};

export default {
  getAllFixedTerms,
  getFixedTermById,
  createFixedTerm,
  updateFixedTerm,
  getFixedTermsByAccountId};
