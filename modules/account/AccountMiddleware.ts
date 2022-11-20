import express from 'express'

class AccountMiddleware {
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

export default new AccountMiddleware()