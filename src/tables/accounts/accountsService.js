import knex from "../../database/knex.js";
const TABLE_NAME = "accounts";

// Obtener una cuenta por ID
const getAccount = async (accountId) => {
  try {
    const account = await knex(TABLE_NAME).where("id", accountId).first();
    if (!account) {
      return { message: "Account not found", success: false };
    }
    return account;
  } catch (error) {
    throw error;
  }
};

// Obtener todas las cuentas
const getAllAccounts = async () => {
  try {
    const accounts = await knex(TABLE_NAME).select("*");
    return { accounts, success: true };
  } catch (error) {
    throw error;
  }
};

// Crear una nueva cuenta
const createAccount = async (account) => {
  try {
    const { cbu, alias, account_type, user_id, opening_date, overdraft_limit, currency } =
      account;

    const existingCBU = await knex(TABLE_NAME).where("cbu", cbu).first();
    const existingAlias = await knex(TABLE_NAME).where("alias", alias).first();

    if (existingCBU) {
      throw new Error("CBU already exists");
    }

    if (existingAlias) {
      throw new Error("Alias already exists");
    }

    await knex(TABLE_NAME).insert({
      balance: 0.0,
      opening_date: new Date(),
      closing_date: null,
      cbu,
      alias,
      account_type,
      overdraft_limit: overdraft_limit || 0.0,
      user_id,
      currency : currency || 'ars',
    });

    const newAccount = await knex(TABLE_NAME).where("cbu", cbu).first();

    return newAccount.id;
  } catch (error) {
    throw error;
  }
};

// Actualizar balance
const updateAccountBalance = async (accountId, amount) => {
  try {
    const account = await knex(TABLE_NAME).where("id", accountId).first();

    if (!account) {
      return { message: "Cuenta no encontrada", success: false };
    }

    const newBalance = parseFloat(account.balance) + parseFloat(amount);

    const rowsUpdated = await knex(TABLE_NAME)
      .where("id", accountId)
      .update({ balance: newBalance });

    if (rowsUpdated === 0) {
      return { message: "No se pudo actualizar el balance", success: false };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Actualizar alias
const updateAccountAlias = async (accountId, newAlias) => {
  try {
    const existingAccount = await knex(TABLE_NAME)
      .where({ alias: newAlias })
      .first();

    if (existingAccount) {
      throw new Error("Alias already exists");
    }

    await knex(TABLE_NAME).where({ id: accountId }).update({ alias: newAlias });

    return { message: "Alias updated successfully" };
  } catch (error) {
    throw error;
  }
};

// Dar de baja una cuenta
const deactivateAccount = async (accountId) => {
  try {
    const rowsUpdated = await knex(TABLE_NAME).where("id", accountId).update({
      closing_date: new Date(),
    });

    if (rowsUpdated === 0) {
      return { message: "Account not found", success: false };
    }

    return { message: "Account deactivated successfully", success: true };
  } catch (error) {
    throw error;
  }
};

// Obtener una cuenta por alias
const getAccountIdByAliasService = async (alias) => {
  try {
    // Busca la cuenta con el alias
    const account = await knex(TABLE_NAME).select("*").where({ alias }).first();

    // Verifica si se encontró una cuenta y si tiene currency igual a 'ars'
    if (account && account.currency === 'ars') {
      return account.id; // Devuelve el ID si es 'ars'
    }

    return false; // Si no es 'ars' o no hay cuenta, devuelve false
  } catch (error) {
    // Lanza el error en caso de fallo
    throw error;
  }
};


// Obtener una cuenta por CBU
const getAccountIdByCBUService = async (cbu) => {
  try {
    const account = await knex(TABLE_NAME).select("id").where({ cbu }).first();

    return account ? account.id : false;
  } catch (error) {
    throw error;
  }
};

// Obtener cuentas por id o DNI
const getAccountsByUserIdOrDni = async (identifier) => {
  try {
    const user = await knex("users")
      .select("id")
      .where({ dni: identifier })
      .first();

    if (user) {
      return await knex(TABLE_NAME).where({ user_id: user.id });
    } else {
      return await knex(TABLE_NAME).where({ user_id: identifier });
    }
  } catch (error) {
    throw new Error(`Error fetching accounts: ${error.message}`);
  }
};

export default {
  getAccount,
  getAllAccounts,
  createAccount,
  updateAccountBalance,
  updateAccountAlias,
  deactivateAccount,
  getAccountIdByAliasService,
  getAccountIdByCBUService,
  getAccountsByUserIdOrDni,
};
