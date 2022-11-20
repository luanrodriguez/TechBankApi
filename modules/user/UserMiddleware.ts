import express from 'express'
import argon2 from 'argon2'
import userService from './UserService'
import { getJWTContent } from '../../utils/handleJWT'

class UserMiddleware {
    async validateJWT(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ')
                if(authorization[0] !== 'Bearer') {
                    return res.send(401).send()
                } else {
                    res.locals.jwt = getJWTContent(authorization[1])
                    return next()
                }
            } catch {
                return res.status(403).send()
            }
        } else {
            return res.status(401).send()
        }
    }

    async validateIfIsSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if(
            req.params &&
            req.params.username &&
            req.params.username === res.locals.jwt.username
        ) {
            return next()
        }
        return res.status(403).send()
    }

    async verifyUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.getUserByUsernameWithPassword({username: req.body.username})
        
        if(user) {
            req.body.id = user.id
            req.body.accountId = user.accountId
            if(await argon2.verify(user.password, req.body.password)) {
                return next()
            }
        }

        res.status(400).send({
            error: 'Usuário e/ou senha incorretos'
        })  
    }

    async validateIfUsernameAlreadyExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const username = await userService.getUserByUsername({username: req.body.username})
        if(username.username) {
            res.status(400).send({
                error: 'Usuário já cadastrado'
            })
        } else {
            next()
        }    
    }
}

export default new UserMiddleware()