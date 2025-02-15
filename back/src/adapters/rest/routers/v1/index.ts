import { Router } from 'express';
import authRouters from './authRouter'

const routesV1 = Router()

routesV1.use('/', authRouters)

export default routesV1