import express from 'express'
import accountService from './AccountService'

class AccountController {
    async getAccountById(
        req: express.Request,
        res: express.Response,
    ) {
        const account = await accountService.getAccountById({accountId: req.params.accountId})
        res.status(200).send(account)
    }
}

export default new AccountController()