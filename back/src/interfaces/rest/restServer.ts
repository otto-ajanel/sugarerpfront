import Fastify from 'fastify';
import cors from '@fastify/cors'

import authRouters from '../../adapters/rest/routers/v1/authRouter';
import { getUsers, createUser } from '../../adapters/rest/controllerss';
import { UserService } from '../../application/userServices';
import { UserRepository } from '../../domain/repositories/userRepository';
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

//iniciand o app
 import routesV1 from '../../adapters/rest/routers/v1/index'

const restServer = Fastify()
 restServer.register(cors,{
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
});


restServer.register(authRouters,{prefix:'/'});

restServer.get('/users', (req, res) => getUsers(req, res, userService));
restServer.post<{
    Body:{
        name:string
    }
}>('/users', (req, res) => createUser(req, res, userService));

restServer.register(routesV1,{prefix:'/apiv1'})

export default restServer


