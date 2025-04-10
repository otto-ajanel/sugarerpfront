import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../../../application/authServices';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const singin = async (
  request: FastifyRequest,
  reply: FastifyReply,
  authService: AuthService
) => {
  try {
    // Se tipa el body para obtener email y password
    const { email, password } = request.body as { email: string; password: string };
    const user = await authService.getUser(email, password);
    
    if (!user) {
      return reply.code(404).send({
        message: 'not exist user'
      });
    }
    
    const secretword = process.env.secretKeyToCrypto || "";
    const token = encrypToken(user, secretword);
    
    return reply.send({
      message: 'success',
      token
    });
  } catch (error) {
    return reply.code(501).send({
      message: error
    });
  }
};

function encrypToken(obj: any, secretword: string) {
  const token = jwt.sign(
    { data: obj, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) },
    secretword
  );
  return token;
}

const decryptToken = async (token: any, secretword: string): Promise<boolean> => {
  try {
    jwt.verify(token.toString(), secretword.toString());
    return true;
  } catch (error) {
    return false;
  }
};

// Middleware para validación de token en Fastify
export const validetoken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const secretword = process.env.secretKeyToCrypto || "";
  const authHeader = request.headers['authorization'];
  
  if (!authHeader) {
    return reply.code(401).send({ message: 'No se proporcionó el token'})
  }
  return decryptToken(authHeader.split(" ")[1],secretword)
}
