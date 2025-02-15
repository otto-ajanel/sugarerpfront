import { Request, Response } from 'express';
import { AuthService } from '../../../application/authServices';

export const singin = async (req: Request, res: Response, userService: AuthService) => {
  const user = await userService.getUser();
  if(!user){
    return res.status(404).json({
      message: 'not exist user'
    })
  }
 return res.json(user);
};


