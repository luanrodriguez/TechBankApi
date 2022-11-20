import express from "express";

export abstract class RoutePattern {
    app: express.Application
    name: string

    constructor(app: express.Application, name: string) {
        this.app = app
        this.name = name
        this.configureRoute()
    }

    abstract configureRoute(): express.Application
}