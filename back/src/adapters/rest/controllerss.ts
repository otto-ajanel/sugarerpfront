import { Request, Response } from 'express';
import { UserService } from '../../application/userServices';

export const getUsers = async (req: Request, res: Response, userService: UserService) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response, userService: UserService) => {
  const { name } = req.body;
  const newUser = await userService.createUser(name);
  res.status(201).json(newUser);
};
