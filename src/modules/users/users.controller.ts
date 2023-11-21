import { Request, Response } from "express";

export class UsersController {
  createUser(
    req: Request, res: Response
  ) {
    res.json('deu bom')
  }
}