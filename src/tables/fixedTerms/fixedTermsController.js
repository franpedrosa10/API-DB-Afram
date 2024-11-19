import fixedTermsService from "./fixedTermsService.js";

// Obtener todos los plazos fijos
const getAllFixedTermsController = async (req, res, next) => {
  try {
    const fixedTerms = await fixedTermsService.getAllFixedTerms();
    return res.status(200).json(fixedTerms);
  } catch (error) {
    next(error);
  }
};

// Obtener un plazo fijo por ID
const getFixedTermByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fixedTerm = await fixedTermsService.getFixedTermById(id);
    if (!fixedTerm) {
      return res
        .status(404)
        .json({ success: false, message: "Fixed term not found" });
    }
    return res.status(200).json(fixedTerm);
  } catch (error) {
    next(error);
  }
};

// Crear un plazo fijo
const createFixedTermController = async (req, res, next) => {
  const { account_id, invested_amount, expiration_date, interest_rate_id, start_date, interest_earned } =
    req.body;

    console.log(account_id, invested_amount, expiration_date, interest_rate_id, start_date);
    const is_paid = 'no';
  if (
    !account_id ||
    invested_amount === undefined ||
    expiration_date === undefined ||
    start_date === undefined ||
    interest_earned === undefined ||
    !interest_rate_id
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const fixedTermData = {
    account_id,
    invested_amount,
    start_date: new Date(),
    expiration_date,
    interest_rate_id,
    interest_earned,
    is_paid
  };

  try {
    const result = await fixedTermsService.createFixedTerm(fixedTermData);
    return res.status(201).json(result[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar plazo fijo por ID
const updateFixedTermController = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const response = await fixedTermsService.updateFixedTerm(id, updatedData);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Obtener plazos fijos por ID de usuario
const getFixedTermsByAccountIdController = async (req, res, next) => {
  const { account_id } = req.params;
  try {
    const fixedTerms = await fixedTermsService.getFixedTermsByAccountId(account_id);
    if (!fixedTerms || fixedTerms.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No fixed terms found for the user" });
    }
    return res.status(200).json(fixedTerms);
  } catch (error) {
    next(error);
  }
};

const updateIsPaidController = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await fixedTermsService.updateIsPaid(id); 
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
  getAllFixedTermsController,
  getFixedTermByIdController,
  createFixedTermController,
  updateFixedTermController,
  getFixedTermsByAccountIdController,
  updateIsPaidController
};
