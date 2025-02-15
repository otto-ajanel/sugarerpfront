
import {Router, Request, Response} from "express";
import {singin} from '../../controllers/authController';

import { AuthService } from '../../../../application/authServices';
import { AuthRepository } from '../../../../domain/repositories/authRepository';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const routersAuth = Router()

routersAuth.post('/login', (req, res) => singin(req, res, authService))

export default routersAuth

