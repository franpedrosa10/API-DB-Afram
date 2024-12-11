import express from 'express';
import accountController from '../accounts/accountsController.js';
import verifyUser from '../../middlewares/authUser.js';
import verifyRol from '../../middlewares/checkRol.js';

const router = express.Router();

router
.get('/', verifyUser, accountController.getAllAccounts)                                 // Para obtener todas las cuentas 
.get('/:id', verifyUser, accountController.getAccount)                                  // Para obtener una cuenta específica
.put('/:id/balance', verifyUser, accountController.updateBalance)                        // Actualizar balance  
.post('/', accountController.createAccount)                                  // Para crear una nueva cuenta 
.put('/alias/:id', verifyUser, accountController.updateAccountAliasController)          // Para actualizar alias 
.put('/deactivate', verifyUser, accountController.deactivateAccount)                   // Para desactivar una cuenta 
.get('/alias/:alias', verifyUser,accountController.getAccountIdByAlias)                // Para obtener ID por alias 
.get('/cbu/:cbu', verifyUser ,accountController.getAccountIdByCBU)                      // Para obtener el id por CBU 
.get('/dni-or-id/:identifier', verifyUser, accountController.getAccountsController);    // Obtener cuentas por ID o DNI del usuario       


export default router;