import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { UserRoute } from './modules/user/UserRoute'
import { AccountRoute } from './modules/account/AccountRoute'
import { TransactionRoute } from './modules/transaction/TransactionRoute'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

new UserRoute(app)
new AccountRoute(app)
new TransactionRoute(app)

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'))