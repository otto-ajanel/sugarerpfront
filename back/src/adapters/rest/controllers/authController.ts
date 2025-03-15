import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../../application/authServices';
import jwt  = require('jsonwebtoken')
import dotenv from 'dotenv';
dotenv.config(); 

export const singin = async(req: Request, res: Response, userService: AuthService) => {
  try {
    
    const {email, password } = req.body;
    const user = await userService.getUser(email , password);
    if(!user){
      
      return res.status(404).json({
        message: 'not exist user'
      })
    }
    const secretword = process.env.secretKeyToCrypto? process.env.secretKeyToCrypto:""
    const token = encrypToken(user, secretword)
    return res.json({
      message:'success',
      token
    });
  } catch (error) {
    return res.status(501).json({
      message: error
    })
    
  }
};

function encrypToken(obj:any, secretword:string){

const token  = jwt.sign({data:obj, exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secretword)
return token
}

const decryptToken = async(token:any, secretword:string )=>{
  try {
    jwt.verify(token,secretword)
    return true
  } catch (error) {
    
    return false
  }
}

export const validetoken = async(req:Request,res:Response, next:NextFunction)=>{
  const secretWord = process.env.secretKeyToCrypto? process.env.secretKeyToCrypto:""
  const authHeader = req.headers['authorization']; // Obtenemos el valor de Authorization del header
  if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó el token' });
  }
  
  const token = authHeader.split(' ')[1]; // Extraemos el token después de 'Bearer'
  if (!token) {
      return res.status(401).json({ message: 'Token no encontrado' });
  }
  if(await decryptToken(token,secretWord)){
    next();
    
  }
  return res.status(401).json({ message: 'Token no Valido' })
}
