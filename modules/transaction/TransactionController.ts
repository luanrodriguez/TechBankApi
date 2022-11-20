import express from 'express'
import transactionService from './TransactionService'

class TransactionController {
    async transferValue(req: express.Request, res: express.Response) {
        const transactionId = await transactionService.transferValue({...req.body, creditedAccountId: res.locals.creditedAccountId})
        res.status(201).send({id:transactionId})
    }

    async getTransactions(req: express.Request, res: express.Response) {
        const transactions = await transactionService.getTransactions({accountId: req.params.accountId})
        res.status(200).send(transactions)
    }
}

export default new TransactionController()