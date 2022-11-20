import express from 'express'
import { body } from 'express-validator';

import bodyValidationMiddleWare from '../../common/BodyValidationMiddleWare';
import { RoutePattern } from "../../common/RoutePattern";
import userMiddleware from './UserMiddleware';
import userController from './UserController';

export class UserRoute extends RoutePattern {
    constructor(app: express.Application) {
        super(app, 'UserRoute')
    }

    configureRoute(): express.Application {
        this.app.route('/authenticate')
            .post(
                body('username')
                    .exists()
                    .withMessage('O campo username é obrigatório'),
                body('password')
                    .exists()
                    .withMessage('O campo password é obrigatório'),
                bodyValidationMiddleWare.verifyBodyFieldsErrors,
                userMiddleware.verifyUserPassword,
                userController.authenticateUser
            )
        
        this.app.route('/user')
            .post(
                body('username')
                    .isLength({min: 3, max: 30})
                    .withMessage('Usuário deve conter no mínimo 3 letras e no máximo 30'),
                body('password')
                    .isStrongPassword({
                        minLength: 8,
                        minUppercase: 1,
                        minNumbers: 1,
                        minLowercase: 0,
                        minSymbols: 0,
                        returnScore: false
                    })
                    .withMessage('Senha deve conter no mínimo 8 caracteres, sendo no mínimo 1 letra maiúscula e 1 número'),    
                bodyValidationMiddleWare.verifyBodyFieldsErrors,
                userMiddleware.validateIfUsernameAlreadyExists,
                userController.createUser
            )

        this.app.route('/user/:username')
            .get(
                userMiddleware.validateJWT,
                userMiddleware.validateIfIsSameUser,
                userController.getUserByUsername
            )
        
        return this.app

    }

}


