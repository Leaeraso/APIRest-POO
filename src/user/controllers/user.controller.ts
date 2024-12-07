import { Request, Response } from "express";
import {UserService} from '../services/user.service';

export class UserController {
    constructor(private readonly userService: UserService = new UserService()) {

    }

    async getUsers(_req: Request, res: Response) {
        try {
            const users = await this.userService.findAllUsers();

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.findUserById(req.params.id);

            res.status(200).json(user)
        } catch (error) {
            console.error(error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { body } = req.body;

            const user = await this.userService.createUser(body);

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const {data} = req.body;

            const user = await this.userService.updateUser(req.params.id, data);

            res.status(200).json(user)
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await this.userService.deleteUser(req.params.id);

            res.status(200).json(user)
        } catch (error) {
            console.error(error);
        }
    }
}
