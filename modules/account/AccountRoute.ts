import express from 'express'
import { body } from 'express-validator';
import { RoutePattern } from "../../common/RoutePattern";
import userMiddleware from '../user/UserMiddleware';
import accountController from './AccountController';
import accountMiddleware from './AccountMiddleware';

export class AccountRoute extends RoutePattern {
    constructor(app: express.Application) {
        super(app, 'AccountRoute')
    }

    configureRoute(): express.Application {
        this.app.route('/account/:accountId')
            .get(
                userMiddleware.validateJWT,
                accountMiddleware.validateIfIsSameAccount,
                accountController.getAccountById
            )
        
        return this.app
    }
}