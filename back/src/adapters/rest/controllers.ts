import { Request, Response } from 'express';
import { IUserService } from '../../application/userService';

export const getUsers = async (req: Request, res: Response, userService: IUserService) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response, userService: IUserService) => {
  const { name } = req.body;
  const newUser = await userService.createUser(name);
  res.status(201).json(newUser);
};
