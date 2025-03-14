import sugarerpClientDB from '../../infrastructure/db/postgresql/sugarerpConexion';
import { User } from '../models/user';

export interface IAuthRepository {
  getUser(email:string, password:string): Promise<User>;
}

export class AuthRepository implements IAuthRepository {

  async getUser(email:string, password:string): Promise<User> {

    const dataUser  = await sugarerpClientDB.select("*").from('users')
   .where({
    email:email,
    password:password
   })
    .first()
    return dataUser;
  }

}
