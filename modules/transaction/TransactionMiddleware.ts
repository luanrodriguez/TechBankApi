import express from 'express'
import accountService from '../account/AccountService'
import userService from '../user/UserService'

class TransactionMiddleware {
    async validateIfIsSameAccountByDebitedAccountId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(
            req.body &&
            req.body.debitedAccountId &&
            req.body.debitedAccountId === res.locals.jwt.accountId
        ) {
            return next()
        }

        return res.status(403).send()
    }

    async validateIfCreditedAccountExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const userFound = await userService.getUserByUsername({username: req.body.creditedUsername})
        if(userFound.accountId) {
            res.locals.creditedAccountId = userFound.accountId
            return next()
        }

        return res.status(400).send({error: 'User not found'})
    }

    async validateIfAccountHasEnoughBalanceToTransfer(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const accountFound = await accountService.getAccountById({accountId: req.body.debitedAccountId})
        if(accountFound?.balance as number < req.body.value) {
            return res.status(400).send({error: 'Not enough balance'})
        }
        return next()
    }

    async validateIfCreditedUsernameIsTheSameAsDebitedAccount(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(req.body.debitedAccountId === res.locals.creditedAccountId) {
            return res.status(400).send({error: 'You cant transfer to your own account'})
        }

        return next()
    }

    async validateIfIsSameAccount(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(
            req.params &&
            req.params.accountId &&
            req.params.accountId === res.locals.jwt.accountId
        ) {
            return next()
        }

        return res.status(403).send()
    }
}

export default new TransactionMiddleware()