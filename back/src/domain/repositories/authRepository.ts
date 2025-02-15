import sugarerpClientDB from '../../infrastructure/db/postgresql/sugarerpConexion';
import { User } from '../models/user';

export interface IAuthRepository {
  getUser(): Promise<User>;
}

export class AuthRepository implements IAuthRepository {

  async getUser(): Promise<User> {
    const dataUser = await sugarerpClientDB.select("*").from('user')
    .where("user_id", 10000)
    .first()
    return dataUser;
  }

}
