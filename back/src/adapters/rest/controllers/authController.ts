import { Request, Response } from 'express';
import { AuthService } from '../../../application/authServices';

export const singin = async(req: Request, res: Response, userService: AuthService) => {
  const {email, password } = req.body;
  const user = await userService.getUser(email , password);
  if(!user){

    return res.status(404).json({
      message: 'not exist user'
    })
  }
 return res.json(user);
};