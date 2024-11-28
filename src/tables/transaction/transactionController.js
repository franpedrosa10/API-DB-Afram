import transactionService from "./transactionService.js";

// Obtener transacciones por ID de cuenta
const getTransactionsByAccountIdController = async (req, res, next) => {
  const { accountId } = req.params;

  if (!accountId || isNaN(accountId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid accountId" });
  }

  try {
    const transactions = await transactionService.getTransactionsByAccountId(
      accountId
    );
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva transacción
const createTransactionController = async (req, res, next) => {
  const { amount, source_account_id, destination_account_id, transaction_type } = req.body;

  if (
    amount === undefined ||
    source_account_id === undefined ||
    destination_account_id === undefined ||
    transaction_type === undefined
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "Amount, source_account_id, and destination_account_id are required",
      });
  }

  if (typeof amount !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Amount must be a number" });
  }

  try {
    const result = await transactionService.createTransaction({
      amount,
      source_account_id,
      destination_account_id,
      transaction_type
    });

    return res.status(201).json(result.id);
  } catch (error) {
    next(error);
  }
};

const createFutureTransactionController = async (req, res, next) => {
  const { amount, source_account_id, destination_account_id, transaction_type, transaction_date } = req.body;

  if (
    amount === undefined ||
    source_account_id === undefined ||
    destination_account_id === undefined ||
    transaction_type === undefined ||
    transaction_date === undefined
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "Amount, source_account_id, destination_account_id, transaction_type, and transaction_date are required",
      });
  }

  if (typeof amount !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "Amount must be a number" });
  }

  try {
    // Crear transacción futura
    const result = await transactionService.createFutureTransaction({
      amount,
      source_account_id,
      destination_account_id,
      transaction_type,
      transaction_date,
      is_paid: 'no'
    });

    return res.status(201).json({ transactionId: result.id });
  } catch (error) {
    next(error);
  }
};


//Filtrar transacciones
const filterTransactionsController = async (req, res, next) => {
  const filters = req.body;

  try {
    const transactions = await transactionService.filterTransactions(filters);
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// Obtener una transacción por ID
const getTransactionByIdController = async (req, res, next) => {
  const { transactionId } = req.params;

  if (!transactionId || isNaN(transactionId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid transactionId" });
  }

  try {
    const transaction = await transactionService.getTransactionById(
      transactionId
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

const updateIsPaidTransactionController = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await transactionService.updateIsPaidTransaction(id); 
    if (result) {
      return res.status(200).json(true);
    } else {
      return res.status(404).json(false);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getTransactionsByAccountIdController,
  createTransactionController,
  filterTransactionsController,
  getTransactionByIdController,
  createFutureTransactionController,
  updateIsPaidTransactionController,
};
