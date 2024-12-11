import knex from "../../database/knex.js";
const TABLE_NAME = "transactions";

// Obtener transacciones por ID de cuenta
const getTransactionsByAccountId = async (accountId) => {
  try {
    const accountExists = await knex("accounts")
      .select("id")
      .where("id", accountId)
      .first();

    if (!accountExists) {
      throw new Error("Account not found"); 
    }

    const transactions = await knex(TABLE_NAME)
      .select("*")
      .where("source_account_id", accountId)
      .orWhere("destination_account_id", accountId)
      .orderBy("id", "desc");

    return transactions;
  } catch (error) {
    throw error;
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

const createFutureTransaction = async (transactionData) => {
  try {

      const localDate = new Date();
      localDate.setHours(1, 0, 0, 0);

      const transactionDate = transactionData.transaction_date
      ? new Date(transactionData.transaction_date).toISOString().slice(0, 19).replace('T', ' ')
      : localDate.toISOString().slice(0, 19).replace('T', ' ');


    await knex(TABLE_NAME).insert({
      amount: transactionData.amount,
      transaction_date: transactionDate, 
      source_account_id: transactionData.source_account_id,
      destination_account_id: transactionData.destination_account_id,
      transaction_type: transactionData.transaction_type,
      is_paid: "no",
    });

    const newTransaction = await knex(TABLE_NAME)
      .where("amount", transactionData.amount)
      .andWhere("source_account_id", transactionData.source_account_id)
      .andWhere("destination_account_id", transactionData.destination_account_id)
      .andWhere("transaction_type", transactionData.transaction_type)
      .andWhere("is_paid", "no")
      .orderBy("id", "desc")
      .first();

    return newTransaction.id;
  } catch (error) {
    throw new Error(`Error creating future transaction: ${error.message}`);
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

const updateIsPaidTransaction = async (id) => {
  try {
    await knex(TABLE_NAME)
          .where({ id: id })
          .update({ is_paid: "yes" });
    return true;  
  } catch (error) {
    throw new Error(`Error updating is paid: ${error.message}`);
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const rowsDeleted = await knex(TABLE_NAME)
      .where({ id: transactionId })
      .del();

    if (rowsDeleted === 0) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }

    return true;
  } catch (error) {
    throw new Error(`Error deleting transaction: ${error.message}`);
  }
};


export default {
  getTransactionsByAccountId,
  createTransaction,
  filterTransactions,
  getTransactionById,
  createFutureTransaction,
  updateIsPaidTransaction,
  deleteTransaction
};
