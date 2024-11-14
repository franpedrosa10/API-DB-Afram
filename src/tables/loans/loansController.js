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
  const { amount, expiration_date, user_id, interest_rate_id } = req.body;

  if (amount === undefined || amount === null || isNaN(amount)) {
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
    user_id,
    interest_rate_id,
  };

  try {
    const newLoanId = await loansService.createLoan(loanData);
    return res.status(201).json(newLoanId);
  } catch (error) {
    next(error);
  }
};

// Actualizar un préstamo por ID
const updateLoanController = async (req, res, next) => {
  const { loanId } = req.params;
  const { amount } = req.body;

  try {
    const updatedLoan = await loansService.updateLoan(loanId, amount);
    if (!updatedLoan) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    return res.status(200).json(updatedLoan);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllLoansController,
  getLoanByIdController,
  createLoanController,
  updateLoanController,
};
