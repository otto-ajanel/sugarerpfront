import sugarerpClientDB from '../../infrastructure/db/postgresql/sugarerpConexion';
import { User } from '../models/user';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(email: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    const dataUsers = await sugarerpClientDB.select("*").from('users')
    .where("id_user","<", 50)
    return dataUsers;
  }

  async createUser(email: string): Promise<User> {
    const user = new User(1, email, "heeleo", 1);
    this.users.push(user);
    return user;
  }
}
