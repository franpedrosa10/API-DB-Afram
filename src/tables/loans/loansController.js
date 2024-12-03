import loansService from "./loansService.js";

// Obtener todos los préstamos
const getAllLoansController = async (req, res, next) => {
  try {
    const loans = await loansService.getAllLoans();
    return res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
};

// Obtener un préstamo por ID
const getLoanByIdController = async (req, res, next) => {
  const { loanId } = req.params;
  try {
    const loan = await loansService.getLoanById(loanId);
    if (!loan) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo préstamo
const createLoanController = async (req, res, next) => {
  const { amount, expiration_date, account_id, interest_rate_id, return_amount } = req.body;

  if (amount === undefined || amount === null || isNaN(amount) ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Amount is required and must be a number",
      });
  }

  const loanData = {
    amount: parseFloat(amount),
    expiration_date,
    request_date: new Date(),
    account_id,
    interest_rate_id,
    return_amount
  };

  try {
    const newLoanId = await loansService.createLoan(loanData);
    return res.status(201).json(newLoanId);
  } catch (error) {
    next(error);
  }
};

// Obtener plazos fijos por ID de usuario
const getLoansByAccountIdController = async (req, res, next) => {
  const { account_id } = req.params;
  try {
    const loan = await loansService.getLoansByAccountId(account_id);
    if (!loan || loan.length === 0) {
      return res
        .status(404)
        .json(false);
    }
    return res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};

const updatePaidController = async (req, res, next) => {
  const { id } = req.params;  // Obtenemos el ID del préstamo desde los parámetros de la URL
  const { amount } = req.body;  // Obtenemos el monto a sumar al campo "paid"

  // Validamos que el monto sea un número válido
  if (amount === undefined || amount === null || isNaN(amount)) {
    return res.status(400).json({
      success: false,
      message: "Amount is required and must be a number",
    });
  }

  try {
    // Llamamos a la función del servicio para actualizar el campo "paid"
    const updatedLoan = await loansService.updatePaid(id, amount);

    if (!updatedLoan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found or update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Loan paid amount updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getAllLoansController,
  getLoanByIdController,
  createLoanController,
  getLoansByAccountIdController,
  updatePaidController
};
