import knex from "../../database/knex.js";
const TABLE_NAME = "Transactions";

// Obtener transacciones por ID de cuenta
const getTransactionsByAccountId = async (accountId) => {
  try {
    const transactions = await knex(TABLE_NAME)
      .select("*")
      .where("source_account_id", accountId)
      .orWhere("destination_account_id", accountId)
      .orderBy("id", "desc");

    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};

// Crear una nueva transacción
const createTransaction = async (transactionData) => {
  try {
    const currentDate = new Date().toISOString();
    const localDate = new Date();
    localDate.setHours(localDate.getHours() - 3);

    await knex(TABLE_NAME).insert({
      amount: transactionData.amount,
      transaction_date: localDate,
      source_account_id: transactionData.source_account_id,
      destination_account_id: transactionData.destination_account_id,
      transaction_type: transactionData.transaction_type
    });

    const newTransaction = await knex(TABLE_NAME)
      .where("amount", transactionData.amount)
      .andWhere("source_account_id", transactionData.source_account_id)
      .andWhere(
        "destination_account_id",
        transactionData.destination_account_id
      )
      .andWhere("transaction_type", transactionData.transaction_type)
      .orderBy("transaction_date", "desc")
      .first();

    return newTransaction.id;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
};

// Filtrar transacciones
const filterTransactions = async (filters) => {
  try {
    const query = knex(TABLE_NAME).select("*");

    if (filters.startDate) {
      query.where("transaction_date", ">=", filters.startDate);
    }
    const filterTransactions = async (filters) => {
      try {
        const query = knex(TABLE_NAME).select("*");

        if (filters.startDate) {
          query.where("transaction_date", ">=", filters.startDate);
        }

        if (filters.endDate === null) {
          query.whereNull("transaction_date");
        } else if (filters.endDate) {
          query.where("transaction_date", "<=", filters.endDate);
        }

        if (filters.minAmount) {
          query.where("amount", ">=", filters.minAmount);
        }

        if (filters.maxAmount) {
          query.where("amount", "<=", filters.maxAmount);
        }

        const transactions = await query;
        return transactions;
      } catch (error) {
        throw new Error(`Error filtering transactions: ${error.message}`);
      }
    };

    if (filters.endDate) {
      query.where("transaction_date", "<=", filters.endDate);
    }

    if (filters.minAmount) {
      query.where("amount", ">=", filters.minAmount);
    }

    if (filters.maxAmount) {
      query.where("amount", "<=", filters.maxAmount);
    }

    const transactions = await query;
    return transactions;
  } catch (error) {
    throw new Error(`Error filtering transactions: ${error.message}`);
  }
};

// Obtener una transacción por ID
const getTransactionById = async (transactionId) => {
  try {
    const transaction = await knex(TABLE_NAME)
      .select("*")
      .where({ id: transactionId })
      .first();
    return transaction || null;
  } catch (error) {
    throw new Error(`Error fetching transaction: ${error.message}`);
  }
};

export default {
  getTransactionsByAccountId,
  createTransaction,
  filterTransactions,
  getTransactionById,
};
