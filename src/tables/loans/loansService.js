import knex from "../../database/knex.js";
const TABLE_NAME = "Loans";

// Obtener todos los préstamos
const getAllLoans = async () => {
  try {
    return await knex(TABLE_NAME).select("*");
  } catch (error) {
    throw new Error(`Error fetching loans: ${error.message}`);
  }
};

// Obtener un préstamo por ID
const getLoanById = async (loanId) => {
  try {
    const loan = await knex(TABLE_NAME)
      .select("*")
      .where({ id: loanId })
      .first();
    return loan || null;
  } catch (error) {
    throw new Error(`Error fetching loan: ${error.message}`);
  }
};

// Crear un nuevo préstamo
const createLoan = async (loanData) => {
  try {
    const [id] = await knex(TABLE_NAME).insert(loanData).returning("id");
    return id;
  } catch (error) {
    throw new Error(`Error creating loan: ${error.message}`);
  }
};

// Actualizar un préstamo por ID
const updateLoan = async (loanId, amountToAdd) => {
  try {
    await knex(TABLE_NAME).where({ id: loanId }).increment("paid", amountToAdd);
    return true;
  } catch (error) {
    throw new Error(`Error updating loan: ${error.message}`);
  }
};

export default {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
};
