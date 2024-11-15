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
    await knex(TABLE_NAME).insert(loanData);
    return true;
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

// Obtener préstamos por account_id
const getLoansByAccountId = async (accountId) => {
  try {
    return await knex(TABLE_NAME).where({ account_id: accountId });
  } catch (error) {
    throw new Error(`Error fetching by  ID: ${error.message}`);
  }
};

// Sumar al paid
const updatePaid = async (loanId, amountToAdd) => {
  try {
    const result = await knex(TABLE_NAME)
      .where({ id: loanId })
      .increment("paid", amountToAdd);


    if (result > 0) {
      return true;  
    } else {
      return false;  
    }
  } catch (error) {
    throw new Error(`Error updating paid field: ${error.message}`);
  }
};

export default {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  getLoansByAccountId,
  updatePaid
};
