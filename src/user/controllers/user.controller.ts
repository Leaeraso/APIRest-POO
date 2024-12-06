import { Request, Response } from "express";

export class UserController {
    getUsers(_req: Request, res: Response) {
        res.status(200).json({user: 'Leandro Eraso'});
    }
}
