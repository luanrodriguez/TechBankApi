import express from 'express'
import { body } from 'express-validator'
import bodyValidationMiddleWare from '../../common/BodyValidationMiddleWare';
import { RoutePattern } from "../../common/RoutePattern";
import userMiddleware from '../user/UserMiddleware';
import transactionController from './TransactionController';
import transactionMiddleware from './TransactionMiddleware';

export class TransactionRoute extends RoutePattern {
    constructor(app: express.Application) {
        super(app, 'TransactionRoute')
    }

    configureRoute(): express.Application {
        this.app.route('/transaction')
            .post(
                body('debitedAccountId')
                    .isString()
                    .withMessage('debitedAccountId is missing'),
                body('creditedUsername')
                    .isString()
                    .withMessage('creditedUsername is missing')
                    .isLength({min: 3})
                    .withMessage('this username is too short'),
                body('value')
                    .isFloat({gt: 0})
                    .withMessage('the value must be greater than 0'),
                bodyValidationMiddleWare.verifyBodyFieldsErrors,
                userMiddleware.validateJWT,
                transactionMiddleware.validateIfIsSameAccountByDebitedAccountId,
                transactionMiddleware.validateIfCreditedAccountExist,
                transactionMiddleware.validateIfCreditedUsernameIsTheSameAsDebitedAccount,
                transactionMiddleware.validateIfAccountHasEnoughBalanceToTransfer,
                transactionController.transferValue
            )

        this.app.route('/transaction/account/:accountId')
            .get(
                userMiddleware.validateJWT,
                transactionMiddleware.validateIfIsSameAccount,
                transactionController.getTransactions
            )

        return this.app
    }
}