import accountsService from "./accountsService.js";

// Obtener una cuenta por ID
const getAccount = async (req, res, next) => {
  const accountId = req.params.id;
  try {
    const result = await accountsService.getAccount(accountId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener todas las cuentas
const getAllAccounts = async (req, res, next) => {
  try {
    const result = await accountsService.getAllAccounts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Actualizar el saldo de una cuenta
const updateBalance = async (req, res, next) => {
  const accountId = req.params.id;
  const { amount } = req.body;

  if (typeof amount !== "number") {
    return res
      .status(400)
      .json({ success: false, message: "El monto debe ser un número" });
  }

  try {
    const result = await accountsService.updateAccountBalance(
      accountId,
      amount
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva cuenta
const createAccount = async (req, res) => {
  try {
    const accountData = req.body;

    const result = await accountsService.createAccount(accountData);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

// Actualizar alias
const updateAccountAliasController = async (req, res, next) => {
  const { id } = req.params;
  const { alias } = req.body;

  if (!alias) {
    return res
      .status(400)
      .json({ success: false, message: "Alias is required" });
  }

  try {
    const result = await accountsService.updateAccountAlias(id, alias);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Dar de baja una cuenta
const deactivateAccount = async (req, res, next) => {
  const accountId  = req.body.accountId;

  try {
    const result = await accountsService.deactivateAccount(accountId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Obtener una cuenta por alias
const getAccountIdByAlias = async (req, res) => {
  const { alias } = req.params;

  if (!alias) {
    return res
      .status(400)
      .json({ success: false, message: "Alias is required" });
  }

  try {
    const accountId = await accountsService.getAccountIdByAliasService(alias);

    if (accountId) {
      return res.status(200).json(accountId);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener una cuenta por CBU
const getAccountIdByCBU = async (req, res) => {
  console.log(req.params);

  const { cbu } = req.params;

  try {
    const accountId = await accountsService.getAccountIdByCBUService(cbu);

    if (accountId) {
      return res.status(200).json(accountId);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener cuentas por id o DNI
const getAccountsController = async (req, res, next) => {
  const { identifier } = req.params;
  try {
    const accounts = await accountsService.getAccountsByUserIdOrDni(identifier);
    if (!accounts || accounts.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No accounts found for the provided identifier",
        });
    }
    return res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};

export default {
  getAccount,
  getAllAccounts,
  createAccount,
  updateBalance,
  updateAccountAliasController,
  deactivateAccount,
  getAccountIdByAlias,
  getAccountIdByCBU,
  getAccountsController,
};
