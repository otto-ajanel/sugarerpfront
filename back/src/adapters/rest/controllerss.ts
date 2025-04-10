import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../application/userServices';

interface CreateUserBody {
  name: string;
}

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply,
  userService: UserService
) => {
  const users = await userService.getUsers();
  return reply.send(users);
};

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply,
  userService: UserService
) => {
  const { name } = request.body;
  const newUser = await userService.createUser(name);
  return reply.code(201).send(newUser);
};
