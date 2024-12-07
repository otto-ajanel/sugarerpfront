import express from 'express';
import { getUsers, createUser } from '../../adapters/rest/controllers';
import { UserService } from '../../application/userService';
import { UserRepository } from '../../domain/repositories/userRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const restServer = express();

restServer.get('/users', (req, res) => getUsers(req, res, userService));
restServer.post('/users', (req, res) => createUser(req, res, userService));
