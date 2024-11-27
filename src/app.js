import dotenv from 'dotenv' //para usar variables de entorno
dotenv.config();


import express from 'express';
import cors from 'cors';
import routerUsers from './tables/user/userRoutes.js';
import routerAccounts from './tables/accounts/accountsRoutes.js';
import routerTransactions from './tables/transaction/transactionRoutes.js';
import routerCards from './tables/cards/cardsRoutes.js';
import routerInterestRates from './tables/interestRates/interestRatesRoutes.js';
import routerLoans from  './tables/loans/loansRoutes.js';
import routerFixedTerms from './tables/fixedTerms/fixedTermsRoutes.js';
import routerAdresses from  './tables/addresses/addressesRoutes.js';
import routerEmail from './tables/email/emailRoutes.js';
import routerSupport from './tables/support/supportRoutes.js'
import routerSupportMessages from './tables/supportMessages/supportMessagesRoutes.js'


const app = express();
const PORT = process.env.PORT_API

app.use(express.json())
app.use(cors())
app.use('/users',routerUsers)
app.use('/accounts',routerAccounts)
app.use('/transactions',routerTransactions)
app.use('/cards',routerCards)
app.use('/interestRates',routerInterestRates)
app.use('/loans',routerLoans)
app.use('/fixedTerms',routerFixedTerms)
app.use('/addresses',routerAdresses)
app.use('/email', routerEmail)
app.use('/support', routerSupport)
app.use('/message', routerSupportMessages)


app.listen(PORT, () => {
    console.log(`API funcionando en http://localhost:${PORT}`)
})
