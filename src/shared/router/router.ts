import express, { Router } from 'express'

export class BaseRouter<T> {
    public router: Router;
    public controller: T;

    constructor(TController: {new (): T}) {
        this.router = express.Router();
        this.controller = new TController();
        this.createRoutes();
    }

    createRoutes(): void {
        
    }
}
