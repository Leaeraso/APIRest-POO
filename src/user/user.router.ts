import { BaseRouter } from "../shared/router/router";
import {UserController} from './controllers/user.controller';
import { Request, Response } from "express";

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
    }

    createRoutes(): void {
        this.router.get('/users', (req: Request, res: Response) => this.controller.getUsers(req, res));
        this.router.get('/user/:id', (req: Request, res: Response) => this.controller.getUserById(req, res));
        this.router.post('/user', (req: Request, res: Response) => this.controller.createUser(req, res));
        this.router.put('/user/:id', (req: Request, res: Response) => this.controller.updateUser(req, res));
        this.router.delete('/user/:id', (req: Request, res: Response) => this.controller.deleteUser(req, res));
    }
}