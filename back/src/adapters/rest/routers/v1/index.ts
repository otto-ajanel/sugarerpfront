import { Router,request,response } from 'express';
import authRouters from './authRouter'
import {validetoken} from '../../controllers/authController'

const routesV1 = Router()

routesV1.use('/', authRouters)
routesV1.use(validetoken)



export default routesV1