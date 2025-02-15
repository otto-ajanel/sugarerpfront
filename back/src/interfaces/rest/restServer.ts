import express from 'express';
// esto se eliminadar
import { getUsers, createUser } from '../../adapters/rest/controllerss';
import { UserService } from '../../application/userServices';
import { UserRepository } from '../../domain/repositories/userRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

//iniciand o app
 import routesV1 from '../../adapters/rest/routers/v1/index'
export const restServer = express();
// Examples
restServer.get('/users', (req, res) => getUsers(req, res, userService));
restServer.post('/users', (req, res) => createUser(req, res, userService));
restServer.use('/apiv1',routesV1)



