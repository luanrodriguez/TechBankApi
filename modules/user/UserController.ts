import express from 'express'
import argon2 from 'argon2'
import userService from './UserService'

class UserController {
    async authenticateUser(req: express.Request, res: express.Response) {
        const token = await userService.authenticate(req.body)
        res.status(200).send({token})
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password)
        const userId = await userService.createUser(req.body)
        res.status(201).send({userId})
    }

    async getUserByUsername(req: express.Request, res: express.Response) {
        const user = await userService.getUserByUsername({username: req.params.username})
        res.status(201).send(user)
    }
}

export default new UserController()