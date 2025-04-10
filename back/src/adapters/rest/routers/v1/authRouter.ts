import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { singin } from '../../controllers/authController';

import { AuthService } from '../../../../application/authServices';
import { AuthRepository } from '../../../../domain/repositories/authRepository';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export default async function authRoutes(fastify: FastifyInstance, opts: any) {
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return await singin(request, reply, authService);
  });
}
