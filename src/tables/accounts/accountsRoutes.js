import express from 'express';
import accountController from '../accounts/accountsController.js';

const router = express.Router();

router
.get('/', accountController.getAllAccounts)                                 // Para obtener todas las cuentas 
.get('/:id', accountController.getAccount)                                  // Para obtener una cuenta específica 
.post('/', accountController.createAccount)                                 // Actualizar balance 
.put('/:id/balance', accountController.updateBalance)                       // Para crear una nueva cuenta 
.put('/deactivate/:id', accountController.deactivateAccount)                // Para desactivar una cuenta 
.put('/alias/:id', accountController.updateAccountAliasController)          // Para actualizar alias 
.get('/alias/:alias', accountController.getAccountIdByAlias)                // Para obtener ID por alias 
.get('/cbu/:cbu', accountController.getAccountIdByCBU)                      // Para obtener el id por CBU 
.get('/dni-or-id/:identifier', accountController.getAccountsController);    // Obtener cuentas por ID o DNI del usuario       


export default router;