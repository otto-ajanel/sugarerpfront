import sugarerpClientDB from '../../infrastructure/db/postgresql/sugarerpConexion';
import { User } from '../models/user';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(email: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    const dataUsers = await sugarerpClientDB.select("*").from('user')
    .where("user_id","<", 10)
    return dataUsers;
  }

  async createUser(email: string): Promise<User> {
    const user = new User(1, email, 1, 1);
    this.users.push(user);
    return user;
  }
}
