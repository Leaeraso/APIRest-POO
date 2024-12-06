import { BaseRouter } from "../shared/router/router";
import {UserController} from './controllers/user.controller';
import { Request, Response } from "express";

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
    }

    createRoutes(): void {
        this.router.get('/user', (req: Request, res: Response) => this.controller.getUsers(req, res))
    }
}