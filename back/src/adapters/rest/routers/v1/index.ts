// routesV1.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
 // Asegúrate de que este también sea un plugin Fastify
import { validetoken } from '../../controllers/authController';

export default async function routesV1(fastify: FastifyInstance, opts: any) {
  
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    await validetoken(request, reply);
  });

  fastify.get("/mod", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ message: "hola mudno validado" });
  });
}
